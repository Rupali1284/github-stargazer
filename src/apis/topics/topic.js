import { ApolloClient, InMemoryCache } from "@apollo/client";
import configs from "../../configs";
import { gitHubTopicQuery as query } from "./query";
import texts from "../../assets/texts";
import topicsParser from "../../utils";

const { graphqlEndpoint: uri, apiToken } = configs;

const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${apiToken}`,
    },
});

const fetchTopics = async (topic) => {
    try {
        const data = await client.query({ query, variables: { topicQuery: `topic:${topic}` } });
        return topicsParser.parse(data);
    } catch (e) {
        console.error(e);
        return {
            error: texts.fetchTopicError,
        };
    }
};

export default {
    fetchTopics,
};
