export default function SelectArtist(){
return(
    <div className="mainContent">
    <div className="languageCard">
      <div className="languageFrame">
          <div className="languageText">
          Which language songs are your favorite?
          </div> 
          <div className="boxFrame">
               <LanguageBox title="Hindi"/>
               <LanguageBox title="English"/>
               <LanguageBox title="Punjabi"/>
               <LanguageBox title="Haryanvi"/>
          </div>
      </div>
    </div>
  </div>
);
}