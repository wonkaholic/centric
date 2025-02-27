//Assessment - Traverse and find matching nodes
//The goal of this assesment is to retrieve nodes which qty lays between a provided range.
//As parameters you are provided with a minimum and a maximum qty.
//Traverse the node structure and collect the nodes which qty fall between the min/max parameter.
//Return the collected nodes.

interface IParams {
    min: number;
    max: number;
}

interface INode {
    id: string;
    children: INode[];
    qty: number;
}

interface IContext {
    nodes: INode[];
}

interface IResult {
    $response: INode[];
}

const LAMBDA = (params: IParams, ctx: IContext): IResult => {
    const { min, max } = params;
    const { nodes } = ctx;
    
    const result: INode[] = [];

    const traverse = (node: INode) => {
        if (node.qty >= min && node.qty <= max) {
            result.push(node);
        }
        
        // We assume the children are not deeply nested.
        // In case of deeply nested trees (children), we might prefer iterative approach (using a stack) to prevent potential stack overflow
        node.children.forEach(traverse);
    };

    // Traverse each root node in the context
    nodes.forEach(traverse);

    return {
        $response: result,
    };
};