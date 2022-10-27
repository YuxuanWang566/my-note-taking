export const Dummy = () => {
    return (
        <>
            <div className="notes__sidebar">
                <button className="notes__add" type="button">添加新的笔记 📒</button>
                <div className="notes__list"></div>
            </div>
            <div className="notes__preview">
                <input className="notes__title" type="text" placeholder="新笔记...">
                    <textarea className="notes__body">编辑笔记...</textarea>
                </input>
            </div>
        </>
    )
}