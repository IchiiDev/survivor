import './Nopage.scss';

const Nopage = () => {
    return (
        <>
            <div className='leek-image'>
                <img src="/assets/leek.png" />
                <div className='leek-text'>
                    <strong>404 not found</strong>
                    <p>Looks like you found a leek!</p>
                </div>
            </div>
        </>
    )
};

export default Nopage;
