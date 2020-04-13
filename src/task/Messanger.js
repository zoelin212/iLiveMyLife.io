import React from 'react';
import gql from 'graphql-tag';
import { Query} from 'react-apollo';
import Sender from "./Sender";
import Messages from "./Messages";
import { MESSAGES_PER_LOAD } from '../constants';
import './Messanger.css';

const GET_MESSAGES = gql`
  query($itemId: String!, $cursor: String, $messagesPerLoad: Int!) {
    messages(itemId: $itemId, cursor: $cursor, messagesPerLoad: $messagesPerLoad) {
      id
      content
      createdBy
      createdAt  
      itemId
      typeId
    }
  }
`;

const Messanger = ( {item} ) => (
    <Query query={GET_MESSAGES} fetchPolicy={'network-only'} variables={{ itemId:item.id, messagesPerLoad: MESSAGES_PER_LOAD }}>
        {({ data, error, loading, fetchMore, subscribeToMore }) => {
            console.log("Mess")
            console.log(item)
            if (!data) {
                return null;
            }

            if (loading) {
                return <span>Loading ...</span>;
            }

            return (
                <div className="messengerContainer">
                    <Messages
                        itemId={item.id}
                        messages={data.messages}
                        fetchMore={fetchMore}
                        subscribeToMore={subscribeToMore}
                    />
                    <Sender item={item}/>
                </div>
            );
        }}
    </Query>
);

export default Messanger;