import {useContext, ChangeEvent, useState} from 'react'
import { ThoughtContext } from '../../contexts/ThoughtContext'
import IThought from '../../interfaces/IThought'
import IThoughtContext from '../../interfaces/IThoughtContext'
import ThoughtList from './ThoughtList'

const SearchThought = () => {

    const {getThoughtById, getThoughtByCategory} = useContext(ThoughtContext) as IThoughtContext;

    const [id, setId] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [result, setResult] = useState<IThought | IThought[] | null>(null);
    
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "id":
                setId(e.target.value);
            break;
            case "category":
                setCategory(e.target.value)
            break;
        }
    }

    const searchById = async () => {        
        try {
            const thought = await getThoughtById(Number(id));
            if (thought) {
                setResult([thought]);
            } else {
                error();
            }
        } catch (e) {
            console.log("Feil under søk etter id:", e);
            error();
        }
    }

    const searchByCategory = async () => {
        try {
            const thoughts = await getThoughtByCategory(category);
            if (thoughts && Array.isArray(thoughts)) {
                setResult(thoughts);
            } else {
                error();
            }
        } catch (e) {
            console.log("Feil under søk etter kategori:", e);
                error();
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
                    <h1 className=' mb-5'>Søk i Innleggene dine</h1>
                </div>
            </header>
            <section className='row justify-content-center mb-5'>
                <div className='col-md-6'>
                    <div className='input-group mb-3'>
                        <label>Søk med id</label>
                        <input className='form-control' name='id' type="number" value={id} onChange={handleChange} />
                        <button className='btn btn-primary' onClick={searchById}>Søk</button>
                    </div>
                    <div className='input-group mb-3'>
                        <label>Søk med Kategori</label>
                        <input className='form-control' name='category' type="string" value={category} onChange={handleChange} />
                        <button className='btn btn-primary' onClick={searchByCategory}>Søk</button>
                    </div>
                </div>
            </section>
            <section className='mb-3'>
                <div className='row text-center'>
                    {Array.isArray(result) && result.length > 0 ? (<ThoughtList/>) : (<p>Ingen innlegg å vise...</p>)}
                    {errorMessage && <p>Noe galt skjedde</p>}
                </div>
            </section>
        </section>
    )
}

export default SearchThought;

