import ThoughtList from "../components/Thoughts/ThoughtList";

const HomePage = () => {
    return (
        <section className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h1 className="mb-4">Make Blogging Great Again</h1>
                </div>
                    <ThoughtList/>
            </div>
        </section>
    )
}

export default HomePage;