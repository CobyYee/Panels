import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react'

export default function Comments(props) {
  return (
    <DiscussionEmbed
        shortname='example'
        config={{
            url: props.url,
            identifier: props.id,
            title: props.title,
            language: 'en_US'
        }}
    >
        <CommentCount 
        shortname='example'
        config={{
            url: props.url,
            identifier: props.id,
            title: props.title,
        }}>Comment</CommentCount>
    </DiscussionEmbed>
    )
    
}
