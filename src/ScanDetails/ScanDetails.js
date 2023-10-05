// eslint-disable-next-line
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './ScanDetails.module.css';
import { useNavigate } from 'react-router-dom';
import BreachedInfo from '../BreachedInfo/BreachedInfo';

const ScanDetails = (props) => {
    // const description='In March 2023, the Indian non-bank lending unit <a href="https://economictimes.indiatimes.com/industry/banking/finance/banking/hdb-financial-services-flags-data-breach-at-service-provider/articleshow/98483482.cms" target="_blank" rel="noopener">HDB Financial Services suffered a data breach that disclosed over 70M customer records</a>. Containing 1.6M unique email addresses, the breach also disclosed names, dates of birth, phone numbers, genders, post codes and loan information belonging to the customers.';
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(1);
    const apiUrl = 'https://monitor.firefox.com/api/v1/scan';
    const proxyUrl = 'https://haveibeenpawned-proxyserver.onrender.com/';
    // console.log(data.breaches);

    useEffect(() => {
        axios.post(proxyUrl+apiUrl, { email: props.email })
            .then(res => {
                setData(res.data);
                // console.log(res.data);
                setLoading(0);
            })
            .catch(err => {
                setLoading(-1);
                console.log(err);
            })
        if(data.heading){
            document.querySelector('.breach-result-email').innerHTML=`<br>${props.email}<br>`;
        }
        // eslint-disable-next-line
    }, [props,data.heading]);
    // console.log(formattedHeading);
    return (
        <div className={classes.scanDetails}>
            {loading===1?<p className={classes.loading}>Loading, please wait…</p>:loading===0?<>
                <div className={classes.breachCount} dangerouslySetInnerHTML={{__html: data.heading}}></div>
                <div className={classes.info}>
                    {/* <BreachedInfo data={{
                        Name:"Duolingo",
                        BreachDate:"2023-01-24T00:00:00.000Z",
                        FaviconUrl:"",
                        logo:"<span role=\"img\" aria-hidden='true' class='breach-logo breach-logo-email bg-violet-5' style='background-color: var(--violet-5);'>C</span>",
                        DataClasses:["email","phone Number"],
                        Description:'In August 2023, <a href="https://www.bleepingcomputer.com/news/security/scraped-data-of-26-million-duolingo-users-released-on-hacking-forum/" target="_blank" rel="noopener">2.6M records of data scraped from Duolingo were broadly distributed on a popular hacking forum</a>. Obtained by enumerating a vulnerable API, the data had earlier appeared for sale in January 2023 and contained email addresses, names, the languages being learned, XP (experience points), and other data related to learning progress on Duolingo. Whilst some of the data attributes are intentionally public, the ability to map private email addresses to them presents an ongoing risk to user privacy.'
                    }}/> */}
                    {data.breaches.length ? (
                        data.breaches.map((info, ind) => (
                            <BreachedInfo key={ind} data={data} ind={ind} />
                        ))
                    ) : (
                        <div className={classes.noBreach}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                            </svg>
                            <p>
                                Good News!
                                <p>You are <span>SAFE</span>
                                </p>
                            </p>
                        </div>
                    )}
                    {/* <div className={classes.noBreach}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                        </svg>

                    </div> */}
                </div>
            </>:
            <h1 className={classes.error}>Error 404 <span>Something went wrong &#128533;</span>
                <button className={classes.goBack} onClick={()=>navigate('/')}>
                    Go Back
                </button>
            </h1>}
        </div>
    );
}

export default ScanDetails;