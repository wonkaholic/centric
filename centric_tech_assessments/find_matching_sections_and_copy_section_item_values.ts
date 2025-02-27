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
    const operations: ICopyOperation[] = [];

    // Find the "From" and "To" sections from the BOM
    const fromSection = ctx.bom.sections.find(section => section.id === params.from_section_id);
    const toSection = ctx.bom.sections.find(section => section.id === params.to_section_id);

    // If both sections exist, proceed with copying values
    if (fromSection && toSection) {
        // Iterate through all items in the "From" section
        fromSection.items.forEach(fromItem => {
            // Find the matching item in the "To" section
            const toItem = toSection.items.find(item => item.id === fromItem.id);

            // If a matching item is found, copy the value
            if (toItem) {
                operations.push(copy(fromItem.id, toItem.id, fromItem.value));
            }
        });
    }

    return {
        $response: operations,
    };
};

//Please use the provided function in the LAMBDA
const copy = (from: string, to: string, value: string | number): ICopyOperation => {
    return {
        from,
        to,
        value
    };
};