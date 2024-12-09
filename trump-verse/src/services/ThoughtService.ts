import axios from "axios";
import IThought from "../interfaces/IThought";

const ThoughtService = (()=>{

    const thoughtControllerEndpoint = "http://localhost:5080/api/thought/";
    const imageUploadControllerEndpoint = "http://localhost:5080/api/imageUpload";
    const thoughtImageEndpoint = "http://localhost:5080/images/";
    const categoryControllerEndpoint = "http://localhost:5080/api/thought/getByCategory/";

    const getAll = async () : Promise<{ success: boolean; data: IThought[] | string}> => { 
        try{
            const result = await axios.get(thoughtControllerEndpoint);
            return {success: true, data: result.data as IThought[]};
        } catch (e){
            console.log("Feil fra getAll i ThoughtService:", e);
            return { success: false, data: "Noe gikk galt ved henting av thoughts i ThoughtService!" };
        }   
    }


    const getById = async (id: number) : Promise<IThought | null> => {
        if( id != null && id != undefined && !isNaN(id) && id.toString().length > 0 ){
            try{
                const result = await axios.get(thoughtControllerEndpoint + id);
                return result.data as IThought;
            } catch(e){
                console.log("Feil fra getById i ThoughtService:", e);
                return null;
            }        
        } else{
            return null;
        }
    }

    const getByCategory = async (category: string) : Promise<IThought | null> => {
        if( category != null && category != undefined && category.length > 0 ){
            try{
                const result = await axios.get(categoryControllerEndpoint + category);
                return result.data as IThought;
            } catch(e){
                console.log("Feil fra getByCategory i ThoughtService:", e);
                return null;
            }        
        } else{
            return null;
        }
    }

    const postThought = async (newthought: IThought, newImage: File | null): Promise<IThought | null> => {
        console.log("Data sendt til server:", newthought);

        try{
            const result = await axios.post(thoughtControllerEndpoint, newthought);
            
            if(newImage){
                const formData = new FormData();
                formData.append("file", newImage);

                await axios({
                    url: imageUploadControllerEndpoint,
                    method: "POST",
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"}
                });
                formData.delete("file");
            }
            return result.data;
        } catch(e){
            console.log("Feil fra postThought i ThoughtService:", e);
            return null;
        }
    }

    const putThought = async (updatedThought: IThought) : Promise<IThought | null> => {
        try{
            const result = await axios.put(thoughtControllerEndpoint, updatedThought);
            console.log(result);
            return result.data;
        }catch(e){
            console.log("Feil fra putThought i ThoughtService:", e);
            return null;
        }
    } 

    const deleteThought = async (id: number) : Promise<IThought | null> => {
        try{
            const result = await axios.delete(thoughtControllerEndpoint + id)
            return result.data;  
        } catch(e){
            console.log("Feil fra deleteThought i ThoughtService:", e);
            return null;
        }  
    }

    const getImageEndpoint = () => {
        return thoughtImageEndpoint
    }

    return{
        getAll, 
        getById,
        getByCategory,
        postThought,
        putThought,
        deleteThought,
        getImageEndpoint
    }

})();

export default ThoughtService;