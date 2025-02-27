//Assessment - Find Matching Sections and Copy Section Item Values
//The goal of this assessment is to copy values from one SectionItem to another
//You are being provided the section id's of the "From" and "To" section
//Search for the "From"/"To" sections within the context BOM.
//Copy all "From" SectionItem values to SectionItems which have matching id's.


interface IParams {
    from_section_id: string;
    to_section_id: string;
}

interface ISectionItem {
    id: string;
    value: string | number;
}

interface ISection {
    id: string;
    items: ISectionItem[];
}

interface IBOM {
    sections: ISection[];
}

interface IContext {
    bom: IBOM;
}

interface IResult {
    $response: ICopyOperation[];
}

interface ICopyOperation {
    from: string;
    to: string;
    value: string | number;
}

const LAMBDA = (params: IParams, ctx: IContext): IResult => {
    const { from_section_id, to_section_id } = params;
    const { bom } = ctx;
    
    // Input validation
    if (!from_section_id || !to_section_id) {
        throw new Error('Both from_section_id and to_section_id must be provided');
    }

    const operations: ICopyOperation[] = [];

    // Find the "From" and "To" sections from the BOM
    const fromSection = bom.sections.find(section => section.id === from_section_id);
    const toSection = bom.sections.find(section => section.id === to_section_id);

    // Error handling
    if (!fromSection) {
        throw new Error(`Source section with ID ${from_section_id} not found`);
    }
    
    if (!toSection) {
        throw new Error(`Target section with ID ${to_section_id} not found`);
    }

    // If both sections exist, proceed with copying values
    if (fromSection && toSection) {
        // Iterate through all items in the "From" section
        fromSection.items.forEach(fromItem => {
            // Find the matching item in the "To" section
            const toItem = toSection.items.find(item => item.id === fromItem.id);

            // If a matching item is found, copy and add the value
            if (toItem) {
                operations.push(copy(fromItem.id, toItem.id, fromItem.value));
            }
        });
    }

    return {
        $response: operations,
    };
};

// Remove the extra `return` statement, making it more compact and easier to read.
const copy = (from: string, to: string, value: string | number): ICopyOperation => ({
    from,
    to,
    value
});