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
    const [deleteMessage, setDeleteMessage] = useState<boolean>(false);
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

    // hjelpefunkjson for å unngå repetiasjon av kode
    const validInput = (id: number, heading: string, content: string, category: string) : boolean=> {
        return (!isNaN(Number(id)) && id > 0 && !!heading.trim() && !!content.trim() && !!category.trim());
    }

    const updateThoughtWithContext = async () => {   
        if(!validInput(Number(id), heading, content, category)){
            error();
            return;
        }
        
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

    function isIThought(obj: any): obj is IThought {
        return obj && typeof obj.id === 'number' && typeof obj.heading === 'string' && typeof obj.content === 'string' && typeof obj.image === 'string' || obj.image === null && typeof obj.category === 'string' ;
    }

    const deleteThoughtWithContext = () => {
        if(!validInput(Number(id), heading, content, category)){
            error();
            return;
        }
        
        try{
            deleteThought( parseInt(id) );
            setDeleteMessage(true);
            setTimeout(
                () => {
                    setDeleteMessage(false)
                }, 
                5000
            );
            console.log("Sletting vellykket.");
        } catch(e){
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
    }

    return (
        <section className='container mt-5'>
            <header className='row'>
                <div className='col text-center'>
                    <h1 className="mb-5">Manage your posts</h1>
                </div>
            </header>
            <section className='row justify-content-center mb-5'>
                <div className='col-md-6'>
                    <div className="input-group mb-3">
                        <label>Enter Id for update/delete:</label>
                        <input className='form-control' name='id' type="number" value={id} onChange={handleChange} />
                        <button className='btn btn-primary' onClick={getByIdFromContext}>Get posts</button>
                    </div>
                    <div className="mb-3">
                        <label>Heading:</label>
                        <input className='form-control' name="heading" type="text" value={heading} onChange={handleChange} />
                    </div>                
                    <div className="mb-3">
                        <label>Content:</label>
                        <input className='form-control' name="content" type="text" value={content} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Category:</label>
                        <input className='form-control' name="category" type="text" value={category} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Image:</label>
                        <input className='form-control' name="image" type="file" onChange={handleChange}/> 
                    </div>
                    <button className='btn btn-success me-2' onClick={updateThoughtWithContext}>Update</button>
                    <button className='btn btn-danger' onClick={deleteThoughtWithContext}>Delete</button>
                </div>                
            </section>
            <section className="mb-3">
                <div className='container'>
                    {
                        message ? <p>The post was updated</p> : <></>
                    }
                    {
                        deleteMessage ? <p>The post was deleted</p> : <></>
                    }    
                    {
                        errorMessage ? <p>Something wrong happened</p> : <></>
                    }
                </div>    
            </section>
        </section>
    )
}

export default UpdateDeleteThought;

