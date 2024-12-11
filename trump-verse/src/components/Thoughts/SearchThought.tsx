import {useContext, ChangeEvent, useState} from 'react'
import { ThoughtContext } from '../../contexts/ThoughtContext'
import IThought from '../../interfaces/IThought'
import IThoughtContext from '../../interfaces/IThoughtContext'
import ThoughtService from '../../services/ThoughtService'

const SearchThought = () => {

    const {getThoughtById, getThoughtByCategory} = useContext(ThoughtContext) as IThoughtContext;

    const [id, setId] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [result, setResult] = useState<IThought[]>([]);
    
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
            const thoughts = await getThoughtById(Number(id));
            if (thoughts) {
                setResult([thoughts]);
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
                    <h1 className=' mb-5'>Search after posts</h1>
                </div>
            </header>
            <section className='row justify-content-center mb-5'>
                <div className='col-md-6'>
                    <div className='input-group mb-3'>
                        <label>Search with id:</label>
                        <input className='form-control' name='id' type="number" value={id} onChange={handleChange} />
                        <button className='btn btn-primary' onClick={searchById}>Search</button>
                    </div>
                    <div className='input-group mb-3'>
                        <label>Search with category:</label>
                        <input className='form-control' name='category' type="string" value={category} onChange={handleChange} />
                        <button className='btn btn-primary' onClick={searchByCategory}>Search</button>
                    </div>
                </div>
            </section>
            <section className='mb-3'>
                {errorMessage && <p>Something wrong happened</p>}
                {Array.isArray(result) ? (result.length > 0 ? (
                    <div>
                        {result.map( (thought, index) => (
                            <div key={"thought" + index}>
                                <h3>{thought.heading}</h3>
                                <p>{thought.content}</p>
                                <p>Category: {thought.category}</p>
                                {thought.image && (<img src={ThoughtService.getImageEndpoint() + thought.image} className="img-fluid"/>)}
                            </div>
                        ))}
                    </div>
                    ) : (<p>No posts to show...</p>)) : null}
            </section>
        </section>
    )
}

export default SearchThought;

