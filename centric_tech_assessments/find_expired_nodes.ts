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

    if (!expiration || !(expiration instanceof Date)) {
        throw new Error('Invalid expiration date provided');
    }
    
    // Check (1) if the node has expired (2) if no container is specified, or the container of the node matches the specifed one
    const expiredNodes = nodes.filter(node => {
        const isExpired = node.expiration <= expiration;
        
        if (!isExpired) return false;
        
        const matchesContainer = !container || 
            (node.container && node.container.id === container);
            
        return matchesContainer;
    });

    return {
        $response: expiredNodes,
    };
};