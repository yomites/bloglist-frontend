import React from 'react'
const BlogForm = (props) => {

    return (
        <form onSubmit={props.addBlog}>
            <div>
                <h2>create new</h2>
                <div>
                    Title: <input
                        type="text"
                        value={props.newTitle}
                        onChange={props.handleTitleChange}
                    />
                </div>
                <div>
                    Author: <input
                        type="text"
                        value={props.newAuthor}
                        onChange={props.handleAuthorChange}
                    />
                </div>
                <div>
                    url: <input
                        type="text"
                        value={props.newUrl}
                        onChange={props.handleUrlChange}
                    />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </div>
        </form>
    )
}

export default BlogForm