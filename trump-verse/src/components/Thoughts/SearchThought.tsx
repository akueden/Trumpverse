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
                setResult(thought);
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
            const thought = await getThoughtByCategory(category);
            if (thought) {
                setResult(thought);
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
        <section>
            <header>
                <h3>Søk i Innleggene dine</h3>
            </header>
            <section>
                <div>
                    <label>Søk med id</label>
                    <input name='id' type="number" value={id} onChange={handleChange} />
                    <button onClick={searchById}>Søk</button>
                </div>
                <div>
                    <label>Søk med Kategori</label>
                    <input name='category' type="string" value={category} onChange={handleChange} />
                    <button onClick={searchByCategory}>Søk</button>
                </div>
            </section>
            <section>
                {Array.isArray(result) && result.length > 0 ? (<ThoughtList/>) : (<p>Ingen innlegg å vise...</p>)}
                {errorMessage && <p>Noe galt skjedde</p>}
            </section>
        </section>
    )
}

export default SearchThought;

