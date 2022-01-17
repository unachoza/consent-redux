//@ts-nocheck
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import { getAirgap } from './init';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';
import Tooltip from './ToolTip/Tooltip';
import Button from './Button/Button';
import './ui.css';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
  // console.log('Initializing Consent Manager UI...');

  const airgap = await getAirgap();
  // console.log(airgap.self, "hehdsjkbfndskjbfsdk")
  const massiveObj = airgap.getPurposeTypes();
  console.log({ massiveObj })
  // AirgapAPI.setConsent(auth, consent): boolean;
//   AirgapAPI.optIn(auth): boolean;
// AirgapAPI.optOut(auth): boolean;
  console.log(airgap.optIn(), "go gogogogogogo")
  
  
  // console.log('Purpose types config:', airgap.getPurposeTypes());

  // console.log('Consent Manager UI config:', config);

  const consentObj = airgap.getConsent();
  // console.log({ consentObj }, 'teh words');
  const obj = airgap.getPurposeTypes();
  // console.log('this here', obj);

  window.onload = () => { 
    console.log('yes whtere sis this i need sto see it')
    // if (shouldShowPopup()) {
    //   const conset = alert('Are you sure you want to')
    // }
  }
  // TODO: Setup your consent manager UI DOM here
  const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const newText = config.body.split('\n').map((str) => {
      return <p>{str}</p>;
    });

    const onToggle = (label) => {
      console.log({label});
      if (!localStorage.getItem(label)) {
        console.log('in here')
        localStorage.setItem(label, 'yesss')
      }
      
    };


    return (
      <div id="consent-ui-container">
        <section>
          <header>
            <h2>{config.consentManagerTitle}</h2>
          </header>
          <p>{newText}</p>
          <h3>{config.prefsHeader}</h3>
          <div className="button-container">

          <Button
            text={'Accept All'}
            onClick={(e) => console.log('Save clicked')}
          />
          <Button
            text={'Deny All'}
            onClick={(e) => console.log('accept clicked')}
          />
          </div>
          {Object.keys(massiveObj).map((key) => {
                console.log(massiveObj[key], 'hereherere');
                return (
                  <div className="both">
                  <ToggleSwitch label={massiveObj[key].name} value={false} onChange={(label)=> onToggle(label)}  />
                  <span>
                    {' '}
                    <img
                      src={`https://res.cloudinary.com/dh41vh9dx/image/upload/v1619578173/3946401821543238897.svg`}
                        className="info-icon"
                      alt="information icon"
                      onClick={toggling}
                    />
                    </span>
                    
                    {isOpen && <Tooltip toggling={toggling} text="informative stuff"  />}
                    </div>
                );
          })}
            <Button
              text={'Save Preferences'}
              onClick={(e) => console.log('deny clicked')}
            />
          <pre>{config.requiredDisclosuresHeader}</pre>
          {/* <pre>{JSON.stringify(airgap.getPurposeTypes(), null, 2)}</pre> */}
          <h3>Consent Manager UI config</h3>
          {/* <pre>{JSON.stringify(config, null, 2)}</pre> */}
        </section>
      </div>
    );
  };

  
  root = document.createElement('div');
  root.className = 'ConsentManager';
  const consetManager = document.getElementsByClassName('ConsentManager');
  console.log("neeeelsndflsdknflsdknflksd", {consetManager})
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root,
    );
    document.body.firstElementChild?.before(root);
    // END: TODO: Setup your consent manager UI DOM here
    
    initialized = true;
  console.log('Consent Manager UI initialized');
};
  

  
  const showConsentManagerUI = async () => {
    const airgap = await getAirgap();
    console.log('Current consent:', airgap.getConsent());
    
    // TODO: Display your consent manager UI here

  };
  
  export const showConsentManager = async () => {
    console.log('transcend.showConsentManager() called');
    if (!initialized) {
      await setupConsentManagerUI();
    }
    await showConsentManagerUI();
  };
  