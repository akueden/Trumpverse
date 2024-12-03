import {useContext, ChangeEvent, useState} from 'react'
import { ThoughtContext } from '../../contexts/ThoughtContext'
import IThought from '../../interfaces/IThought'
import IThoughtContext from '../../interfaces/IThoughtContext'

const UpdateDeleteThought = () => {

    const {getThoughtById, putThought, deleteThought} = useContext(ThoughtContext) as IThoughtContext;

    const [id, setId] = useState<string>("");
    const [heading, setHeading] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | string | null>(null);
    const [category, setCategory] = useState<string>("");

    const [message, setMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "id":
                setId(e.target.value);
            break;
            case "heading":
                setHeading(e.target.value);
            break;
            case "content":
                setContent(e.target.value);
            break;
            case "image":
                if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
            } 
            break;
            case "category":
                setCategory(e.target.value)
            break;
        }
    }

    const getByIdFromContext = async () => {
        if(id != null && id != undefined && id.toString().length >0 && !isNaN(Number(id))){
            try{
                const thought = await getThoughtById(parseInt(id));
                console.log(thought);

                if(thought != null){
                    setHeading(thought?.heading);
                    setContent(thought?.content);
                    setCategory(thought?.category);

                    if (thought.image) {
                        setImage(thought.image);
                        console.log("Bilde URL:", thought.image);
                    }

                } else{
                    error();
                }
            } catch(e){
                error();
                console.log(e);
            }
        } else{
            error();
        } 
    }

    const updateThoughtWithContext = async () => {
        const thoughtToUpdate : IThought = {
            id: parseInt(id),
            heading: heading,
            content: content,
            image: typeof image === 'object' && image instanceof File ? image.name : image, // sjekker om image er et file objekt og henter navnet fra fil objektet
            category: category            
        };

        const result = await putThought(thoughtToUpdate);
        
        if(isIThought(result) ){
            setMessage(true);
            setTimeout(
                () => {
                    setMessage(false);
                },
                5000
            );
        }else{
            error();
        }
    }

    // hjelpefunksjon som håndterer feilmeldinger
    const error = () => {
        setErrorMessage(true);
        setTimeout(
            () => {
                setErrorMessage(false);
            }, 5000);
    };

    function isIThought(obj: any): obj is IThought {
        return obj && typeof obj.id === 'number' && typeof obj.heading === 'string' && typeof obj.content === 'string' && typeof obj.image === 'string' || obj.image === null && typeof obj.category === 'string' ;
    }

    const deleteThoughtWithContext = () => {
        deleteThought( parseInt(id) );
    }

    return (
        <section>
            <header>
                <h3>Administrer Innleggene dine</h3>
            </header>
            <section>
                <div>
                    <label>Angi id for hent/slett</label>
                    <input name='id' type="number" value={id} onChange={handleChange} />
                    <button onClick={getByIdFromContext}>Hent Innlegg</button>
                </div>
                <div>
                    <label>Overskrift</label>
                    <input name="heading" type="text" value={heading} onChange={handleChange} />
                </div>                
                <div>
                    <label>Innhold</label>
                    <input name="content" type="text" value={content} onChange={handleChange} />
                </div>
                <div>
                    <label>Bilde:</label>
                    <input name="image" type="file" onChange={handleChange}/> 
                </div>
                <div>
                    <label>Kategori</label>
                    <input name="category" type="text" value={category} onChange={handleChange} />
                </div>
                <button onClick={updateThoughtWithContext}>Oppdater</button>
                <button onClick={deleteThoughtWithContext}>Slett</button>                
            </section>
            <section>
                {
                    message ? <p>Innlegget ble oppdatert</p> : <></>
                }
                {
                    errorMessage ? <p>Noe galt skjedde</p> : <></>
                }
            </section>
        </section>
    )
}

export default UpdateDeleteThought;

