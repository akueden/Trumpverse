import {useState, ChangeEvent, useContext, useEffect} from 'react'
import ThoughtList from './ThoughtList'
import IThoughtContext from '../../interfaces/IThoughtContext'
import { ThoughtContext } from '../../contexts/ThoughtContext'
import ThoughtService from '../../services/ThoughtService'
import IThought from '../../interfaces/IThought'

const RegisterThought = () => {

    const {postThought} = useContext(ThoughtContext) as IThoughtContext;

    const [thought, setThought] = useState<IThought[]>([]);
    
    const [heading, setHeading] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [category, setCategory] = useState<string>("");

    const [message, setMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    useEffect(()=>{
        getThoughtsFromService();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "heading":
                setHeading(e.target.value);
            break;
            case "content":
                setContent(e.target.value);
            break;
            case "image":
                if(e.target.files && e.target.files[0]){ // Bilde kan være null
                    const file = e.target.files[0];
                    setImage(file);
                } 
            break;
            case "category":
                setCategory(e.target.value);
        }
    }

    const registerThought = async () => {
        if (!heading.trim() && !content.trim() && !category.trim()) {
            error();
            return;
        }

        const newThought = {
            heading: heading,
            content: content,
            image: image?.name,
            category: category
        };
        
        postThought(newThought, image);
        await getThoughtsFromService(); 
    }

    const getThoughtsFromService = async () => {
        try{        
            const thoughtsFromService = await ThoughtService.getAll();

            console.log("FRA SERVICE", thoughtsFromService);

            if( thoughtsFromService.success === true && Array.isArray(thoughtsFromService.data)){            
                setThought(thoughtsFromService.data as IThought[]);
            }else if( thoughtsFromService.success === false ){
                console.log("API returnerte ugyldige data:", thoughtsFromService.data);
                setThought([]);
            }        
        } catch(e){
            console.log("Feil i getAndSetThoughtsFromService:", e);
            setThought([]);
        }
    }

    const error = () => {
        setErrorMessage(true);
        setTimeout(
            () => {
                setErrorMessage(false);
            }, 5000);
    };

    return (
        <section className='container mt-5'>
            <header className='row'>
                <div className='col text-center'>
                    <h1 className="mb-5">Hva tenker du på i dag</h1>
                </div>
            </header>
            <section className='row justify-content-center mb-5'>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <label>Overskrift:</label>
                        <input className='form-control' name='heading' type="text" value={heading} onChange={handleChange}/>
                    </div>
                    <div className='mb-3'>
                        <label>Innhold:</label>
                        <input className='form-control' name='content' type="text" value={content} onChange={handleChange}/>
                    </div>
                    <div className='mb-3'>
                        <label>Bilde:</label>
                        <input className='form-control' name='image' type="file" onChange={handleChange}/> 
                    </div>
                    <div className='mb-3'>
                        <label>Kategori:</label>
                        <input className='form-control' name='category' type="text" value={category} onChange={handleChange}/>
                    </div>
                    <button className='btn btn-primary' onClick={registerThought}>Legg ut innlegg</button>
                </div>
            </section> 
                <div className='col text-center'>
                    <h2 className='mb-5'>Tidligere Innlegg</h2> 
                    {
                        errorMessage ? <p>Kunne ikke legge til nytt innlegg</p> : <></>
                    }
                </div>   
                    {thought.length > 0 ? <ThoughtList/>:<p>Ingen innlegg å vise...</p>}
        </section>
    )
}

export default RegisterThought;
