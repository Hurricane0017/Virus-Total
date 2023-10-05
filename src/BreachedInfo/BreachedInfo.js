import { useState } from 'react';
import classes from '../ScanDetails/ScanDetails.module.css';

const formatDataClasses = (dataClass) => {
    return dataClass.map((data) =>
        data.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );
};


const BreachedInfo = ({data,ind}) => {

    // console.log(data.logos[ind]);
    const [showDescription,setShowDescription]=useState(false);
    const dataClasses = formatDataClasses(data.breaches[ind].DataClasses).join(', ');
    // console.log(dataClasses);
    // console.log(data.breaches[ind])
    // const handleDescriptionClick = (e) => {
    //     e.stopPropagation(); // Stop event propagation to prevent immediate closing
    // };;

    const date = new Date(data.breaches[ind].BreachDate);
    return ( 
        <div className={classes.breaches} key={data.Name}>
            <div className={classes.top}>
                {data.breaches[ind].FaviconUrl!=null?<img src={data.breaches[ind].FaviconUrl} alt={data.Name} />:<span dangerouslySetInnerHTML={{__html: data.logos[ind]}}></span>}
                <h2>{data.breaches[ind].Name}</h2>
            </div>
            {/* <p dangerouslySetInnerHTML={{__html: data.Description}}></p> */}
            <p className={classes.breachDate}>Breach Date : <span>{date.toDateString()}</span></p>
            <p className={classes.leakedInfo}>Leaked information :
                <span>
                    {dataClasses}
                </span>
            </p>
            <p className={classes.moreInfo} onClick={()=>setShowDescription(true)}><u>More Info</u></p>
            {showDescription&&<div className={classes.descriptionOverlay} onClick={()=>setShowDescription(false)}>
                <div className={classes.description}>
                    <div className={classes.top}>Description</div>
                    <div className={classes.descriptionInfo}  dangerouslySetInnerHTML={{__html: data.breaches[ind].Description}}></div>
                    <svg onClick={()=>setShowDescription(false)} xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </div>
            </div>}
        </div>
     );
}
 
export default BreachedInfo;