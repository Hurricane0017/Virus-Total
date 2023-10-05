// eslint-disable-next-line
import { useState } from 'react';
import classes from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';


const HomePage = (props) => {
    const [email, setEmail] = useState('');
    const [warining, setWarning] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || !email.includes('@') || !email.includes('.')) {
            setWarning(true);
            return;
        }
        props.handleEmail(email);
        // console.log(email);
        navigate('/scan-details');
    }

    return (
        <>
            <div className={classes.home}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
                <form className={classes.scanner} onSubmit={handleSubmit}>
                    <label htmlFor="email"><span className={classes.yellowText}>Find out !</span> <span className={classes.whiteText}>If your personal information</span> <span className={classes.yellowText}>has been compromised</span></label>
                    <div className={classes.credentials}>
                        <input type="email" id="email" name="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
                        {warining && <p className={classes.caution}>Enter a valid email address</p>}
                        <button type='submit'>Check Now</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default HomePage;