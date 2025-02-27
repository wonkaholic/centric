//Assessment - Find expired nodes
//The goal of this assesment is to retrieve expired nodes.
//As parameters you are provided with an expiration date and eventually a container id.
//If provided find all nodes in the container that are expired.
//Otherwise find all nodes that are expired, regardless of container association
//Return the collected nodes.

interface IParams {
    container?: string;
    expiration: Date;
}

interface INodeContainer {
    id: string;
}

interface INode {
    id: string;
    container?: INodeContainer;
    expiration: Date;
}

interface IContext {
    nodes: INode[];
}

interface IResult {
    $response: INode[];
}

const LAMBDA = (params: IParams, ctx: IContext): IResult => {
    const { container , expiration } = params;
    const { nodes } = ctx

    // Input validation: It would not be needed in a controlled environment where expiration is
    // coming from a date selection field.
    if (!expiration || !(expiration instanceof Date)) {
        throw new Error('Invalid expiration date provided');
    }
    
    const expiredNodes = nodes.filter(node => {
        // First check if the node has expired
        const isExpired = node.expiration <= expiration;
        
        if (!isExpired) return false;
        
        // Check if no container is specified, or if the node's container matches the specified one
        const matchesContainer = !container || 
            (node.container && node.container.id === container);
            
        return matchesContainer;
    });

    return {
        $response: expiredNodes,
    };
};