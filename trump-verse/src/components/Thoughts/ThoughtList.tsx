import { useContext } from "react";
import { ThoughtContext } from "../../contexts/ThoughtContext";
import IThoughtContext from "../../interfaces/IThoughtContext";
import ThoughtItem from "./ThoughtItem";

const ThoughtList = () => {

    const {thoughts} = useContext(ThoughtContext) as IThoughtContext;

    const createAndGetThoughtJSX = () => {
        if (thoughts.length === 0){
            console.error("Thoughts er ikke en array:", thoughts);
            return <p>Ingen innlegg å vise...</p>;
        }
        
        const thoughtJSX = thoughts.map( (thought, index) => {
            return (
                <ThoughtItem
                    key={"thought" + index}
                    id={thought.id}
                    heading={thought.heading}
                    content={thought.content}
                    image={thought.image}
                    category={thought.category}
                />
            )
        });      
        return thoughtJSX;
    }

    return(
        <section>
            {createAndGetThoughtJSX()}
        </section>
    )
}

export default ThoughtList;

