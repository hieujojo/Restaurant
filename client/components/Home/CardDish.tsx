const CardDish = () => {
    return (
        <>
            <style jsx>{`
                .card {
                    max-width: 28%; 
                    position: relative;
                    background-color: #000000;
                    overflow: hidden;
                    border-radius: 8px; 
                    box-sizing: border-box; 
                }
                .card img {
                    width: 100%;
                    height: auto;
                }
                .overlay {
                    transition: transform 0.5s ease;
                    transform: translateY(-100%);
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    color: #DEDFDF;
                    text-align: center;
                }
                .card:hover .overlay {
                    transform: translateY(0);
                }
                .text-[#C9AB81] {
                    color: #C9AB81;
                }
                .text-[#DEDFDF] {
                    color: #DEDFDF;
                }
                .text-xl {
                    font-size: 1.25rem;
                }
                .text-4xl {
                    font-size: 2.25rem; 
                }
            `}</style>
            <div className="container flex justify-around p-4 max-w-7xl mx-auto">
                <article className="card flex-1 max-w-[28%] relative bg-black overflow-hidden rounded-lg box-border">
                    <img
                        className="card-img"
                        alt="Dish"
                        src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-images-1-673x1024.jpg"
                        sizes="(max-width: 800px) 100vw, 800px"
                    />
                    <div className="overlay">
                        <h3 className="text-[#C9AB81] text-4xl">Flavor</h3>
                        <p>Lorem ipsum dolor sit amet, consectet urta dipis isu cingelit, sed do eiusmodsl ntetm mpor incida idunt utvlabore eti.</p>
                        <p>aliqua. Ut enim ad minim danor venia quisno strud exercitation ullamco labor nisiutse ns aliquip ex ea commodo labr.</p>
                    </div>
                </article>
                <article className="card">
                    <img
                        className="card-img"
                        alt="Dish"
                        src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-images-2-673x1024.jpg"
                        sizes="(max-width: 800px) 100vw, 800px"
                    />
                    <div className="overlay">
                        <h3 className="text-[#C9AB81] text-4xl">Flavor</h3>
                        <p>Lorem ipsum dolor sit amet, consectet urta dipis isu cingelit, sed do eiusmodsl ntetm mpor incida idunt utvlabore eti.</p>
                        <p>aliqua. Ut enim ad minim danor venia quisno strud exercitation ullamco labor nisiutse ns aliquip ex ea commodo labr.</p>
                    </div>
                </article>
                <article className="card">
                    <img
                        className="card-img"
                        alt="Dish"
                        src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-images-3-673x1024.jpg"
                        sizes="(max-width: 800px) 100vw, 800px"
                    />
                    <div className="overlay">
                        <h3 className="text-[#C9AB81] text-4xl">Flavor</h3>
                        <p>Lorem ipsum dolor sit amet, consectet urta dipis isu cingelit, sed do eiusmodsl ntetm mpor incida idunt utvlabore eti.</p>
                        <p>aliqua. Ut enim ad minim danor venia quisno strud exercitation ullamco labor nisiutse ns aliquip ex ea commodo labr.</p>
                    </div>
                </article>
            </div>
        </>
    );
};

export default CardDish;

