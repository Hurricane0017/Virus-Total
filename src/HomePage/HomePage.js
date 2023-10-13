/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import { useEffect, useRef, useState } from 'react';
import classes from './HomePage.module.css';
import axios from 'axios';


const HomePage = () => {
    const [warning, setWarning] = useState(false);
    const [file,setFile]=useState('');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(0);
    const apiUrl = 'https://clamav.internxt.com/filescan';
    const fileInputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setWarning(true);
            return;
        }
        const formdata = new FormData();
        formdata.append('file', file, 'test.txt');
        const config = {
            method: 'post',
            url: apiUrl,
            data: formdata,
        };
        axios(config)
            .then(res => {
                setData(res.data);
                console.log(res.data);
                setLoading(2);
            })
            .catch(err => {
                setLoading(-1);
                console.log(err);
            })
    }
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);
    return (
        <div className={classes.home}>
            <form className={classes.scanner} onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor="file"><span className={classes.yellowText}>Check !</span> <span className={classes.whiteText}>For any <span className={classes.yellowText}>Malicious</span></span> <span className={classes.whiteText}>content in your file</span></label>
                <div className={classes.credentials}>
                    <input ref={fileInputRef} type="file" id="email" name="file" placeholder='Enter your email' onChange={(e)=>{
                        console.log(e.target.files[0]);
                        setFile(e.target.files[0]);
                        setWarning(false);
                        setLoading(1);
                    }}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-file-earmark-fill" viewBox="0 0 16 16">
                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"/>
                    </svg>
                    {warning && <p className={classes.caution}>Upload a file !!</p>}
                    {loading===0?
                        <div className={classes.fileUpload}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
                            </svg>
                            <p>Drop file to scan for viruses</p>
                        </div>:loading===1?<>
                        <div className={classes.fileUpload}>
                            <p>File Selected for scanning</p>
                            <p>{file.name}</p>
                            <p style={{color:"white",fontSize:"1rem"}}>{file.type}</p>
                        </div>
                        <div className={classes.buttons}>
                            <button onClick={handleSubmit} type='submit'>Scan Now</button>
                            <button onClick={()=>{
                                setLoading(0);
                                setFile('');
                                fileInputRef.current.value='';
                                }}>Cancel</button>
                        </div>
                    </>:<>
                        <div className={classes.fileUpload}>
                            {data&&data.isInfected?<>
                                <p className={classes.infected}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                                    Virus detected for this file
                                </p>
                                <p>{file.name}</p>
                                <p style={{color:"white",fontSize:"1rem"}}>{file.type}</p>
                                <p className={classes.viruses}>Virus identified:<span>{data.viruses}</span></p>
                                <p style={{color:"white",fontSize:"1rem"}}>{data.virus}</p>

                            </>:<>
                                <p className={classes.notInfected}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    No Virus detected for this file
                                </p>
                                <p>{file.name}</p>
                                <p style={{color:"white",fontSize:"1rem"}}>{file.type}</p>
                            </>
                            }
                        </div>
                        <div className={classes.buttons}>
                            <button onClick={()=>{
                                setLoading(0);
                                setFile('');
                                fileInputRef.current.value='';
                                }}>Scan Again</button>
                        </div>
                    </>}
                </div>
            </form>
        </div>
    );
}

export default HomePage;