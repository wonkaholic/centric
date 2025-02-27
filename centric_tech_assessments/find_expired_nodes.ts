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
    const expiredNodes: INode[] = [];

    // Iterate through all nodes in the context
    for (const node of ctx.nodes) {
        // Check if node is expired based on the expiration date provided
        if (node.expiration <= params.expiration) {
            // If container is specified, check that as well
            if (!params.container || (node.container && node.container.id === params.container)) {
                expiredNodes.push(node);
            }
        }
    }

    return {
        $response: expiredNodes,
    };
};