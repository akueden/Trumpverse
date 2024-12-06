import { FC } from "react";
import IThought from "../../interfaces/IThought";
import ThoughtService from "../../services/ThoughtService";

const ThoughtItem : FC<IThought> = ({heading, content, image, category}) => {
    return (
        <article className='row'> 
            <div className='col-lg-8 col-md-10 mx-auto'>  
                <h3>{heading}</h3>
                <p>{content}</p>
                {image && <img src={ThoughtService.getImageEndpoint() + image}/>}
                <p>{category}</p>
            </div>  
        </article>
    )
}

export default ThoughtItem;