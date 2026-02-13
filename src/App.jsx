import React, { useState, useEffect } from 'react';

function App() {
  const [buttonState, setButtonState] = useState({ 
    yesClicked: false, 
    noClicked: false, 
    noClickCount: 0, 
    showMessage: false, 
    showLoveAnimation: false,
    showAfterYesMessage: false,
    showThirdMessage: false,
    showFourthMessage: false,
    showFifthMessage: false,
    showSixthMessage: false,
    showSeventhMessage: false,
    showFinalMessage: false,
    userInput: '',
    isLoading: true,
    isWaiting: false
  });

  useEffect(() => {
    // Hide loading after 2 seconds
    const timer = setTimeout(() => {
      setButtonState(prev => ({ ...prev, isLoading: false }));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (buttonState.yesClicked) {
      // Logic for Yes button
      console.log('Yes clicked - Valentine accepted!');
      // You can add more logic here like showing a success message
    }
  }, [buttonState.yesClicked]);

  useEffect(() => {
    if (buttonState.showLoveAnimation) {
      // Create falling hearts
      createFallingHearts();
    }
  }, [buttonState.showLoveAnimation]);

  const playVoice = () => {
    const audio = new Audio('/voice/New Recording 8.m4a');
    audio.play().catch(error => {
      console.log('Audio play failed:', error);
    });
  };

  const playVoice2 = () => {
    const audio = new Audio('/voice/VOICE2.m4a');
    audio.play().catch(error => {
      console.log('Voice2 play failed:', error);
    });
    
    // Create falling hearts every time voice2 plays
    createFallingHeartsSimple();
  };

  const createFallingHeartsSimple = () => {
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    // Create 25 hearts for more impact
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 5000);
      }, i * 80);
    }
  };

  const createFallingHearts = () => {
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    let heartInterval;
    let heartCount = 0;
    
    // Create hearts continuously
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.top = '-50px';
      heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      heart.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
      document.body.appendChild(heart);
      heartCount++;
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
    };
    
    // Start creating hearts every 200ms
    heartInterval = setInterval(createHeart, 200);
    
    // Play voice and get duration
    const audio = new Audio('/voice/VOICE2.m4a');
    audio.play().catch(error => {
      console.log('Voice2 play failed:', error);
    });
    
    // Stop hearts when voice ends and show second message
    audio.addEventListener('ended', () => {
      clearInterval(heartInterval);
      setButtonState(prev => ({ ...prev, showAfterYesMessage: true }));
    });
    
    // Fallback: stop after 12 seconds max and show second message
    setTimeout(() => {
      clearInterval(heartInterval);
      setButtonState(prev => ({ ...prev, showAfterYesMessage: true }));
    }, 12000);
  };

  const handleYesClick = () => {
    console.log('handleYesClick called. Current state:', buttonState);
    setButtonState(prev => ({ ...prev, isWaiting: true }));
    
    if (buttonState.showAfterYesMessage) {
      // Second message → Third message
      console.log('Second message → Third message');
      setButtonState(prev => ({ 
        ...prev, 
        showAfterYesMessage: false, 
        showThirdMessage: true, 
        isWaiting: false 
      }));
      playVoice2();
      createFallingHeartsSimple();
    } else if (buttonState.showThirdMessage) {
      // Third message → Fourth message
      console.log('Third message → Fourth message');
      setButtonState(prev => ({ 
        ...prev, 
        showThirdMessage: false, 
        showFourthMessage: true, 
        isWaiting: false 
      }));
      playVoice2();
      createFallingHeartsSimple();
    } else if (buttonState.showFourthMessage) {
      // Fourth message → Fifth message
      console.log('Fourth message → Fifth message');
      setButtonState(prev => ({ 
        ...prev, 
        showFourthMessage: false, 
        showFifthMessage: true, 
        isWaiting: false 
      }));
      playVoice2();
      createFallingHeartsSimple();
    } else if (buttonState.showFifthMessage) {
      // Fifth message → Sixth message
      console.log('Fifth message → Sixth message');
      setButtonState(prev => ({ 
        ...prev, 
        showFifthMessage: false, 
        showSixthMessage: true, 
        isWaiting: false 
      }));
      playVoice2();
      createFallingHeartsSimple();
    } else if (buttonState.showSixthMessage) {
      // Sixth message → Seventh message
      console.log('Sixth message → Seventh message');
      setButtonState(prev => ({ 
        ...prev, 
        showSixthMessage: false, 
        showSeventhMessage: true, 
        isWaiting: false 
      }));
      playVoice2();
      createFallingHeartsSimple();
    } else if (buttonState.showSeventhMessage) {
      // Seventh message - check input
      console.log('Seventh message - checking input');
      if (buttonState.userInput.trim().toLowerCase() === 'i love you too') {
        setButtonState(prev => ({ 
          ...prev, 
          showSeventhMessage: false, 
          showFinalMessage: true, 
          isWaiting: false 
        }));
      } else {
        playVoice();
        setButtonState(prev => ({ ...prev, isWaiting: false }));
      }
    } else {
      // First message → Second message (after initial hearts)
      console.log('First message → Second message');
      setButtonState(prev => ({ ...prev, yesClicked: true, showLoveAnimation: true }));
      createFallingHearts();
      setTimeout(() => {
        setButtonState(prev => ({ 
          ...prev, 
          showAfterYesMessage: true, 
          isWaiting: false 
        }));
      }, 3000); // Reduced from 12 seconds to 3 seconds
    }
  };

  const handleNoClick = () => {
    const newCount = buttonState.noClickCount + 1;
    setButtonState(prev => ({ ...prev, noClicked: true, noClickCount: newCount }));
    
    // Play voice on every click
    playVoice();
    
    // Show modal on every click
    setButtonState(prev => ({ ...prev, showMessage: true }));
    
    // Make the No button run away logic
    const button = document.getElementById('no-button');
    if (button) {
      const randomX = Math.random() * (window.innerWidth - 100);
      const randomY = Math.random() * (window.innerHeight - 50);
      button.style.position = 'fixed';
      button.style.left = `${randomX}px`;
      button.style.top = `${randomY}px`;
    }
  };

  const closeMessage = () => {
    setButtonState(prev => ({ ...prev, showMessage: false }));
  };

  return (
    <>
      {/* Loading Screen */}
      {buttonState.isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          flexDirection: 'column'
        }}>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            PLEASE ROTATE YOUR PHONE
          </div>
          <div style={{
            color: '#ccc',
            fontSize: '16px',
            textAlign: 'center'
          }}>
            For best experience
          </div>
        </div>
      )}

      {/* Main App */}
      <div 
        className="bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url(/original-4fb0546da08002980bbc3d8938f999fc.webp)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          minWidth: '100vw'
        }}
      >
      {console.log('Current state:', buttonState)}
      {/* Waiting Message */}
      {buttonState.isWaiting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          flexDirection: 'column'
        }}>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            💕 PLEASE WAIT 💕
          </div>
          <div style={{
            color: '#ccc',
            fontSize: '16px',
            textAlign: 'center'
          }}>
            Getting ready for the next question...
          </div>
          <div style={{
            marginTop: '20px',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      )}

      {/* Custom Message Modal */}
      {buttonState.showMessage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '20px', color: '#1f2937' }}>
             CHABWLA
            </p>
            <button 
              onClick={closeMessage}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                fontWeight: 'bold',
                padding: '8px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '32px', maxWidth: '448px', margin: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            💕 KHUMALI 💕
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
           💕 POWERD BY LAND 💕
          </p>
        </div>
        <p className="text-center text-gray-800 text-2xl p-10">
          {buttonState.showSeventhMessage ? 'I LOVE YOU SO MUCH 💍' : 
           buttonState.showSixthMessage ? 'I LOVE YOU 💍' : 
           buttonState.showFifthMessage ? 'KAIJAK NAI DA ANG BAI💍' : 
           buttonState.showFourthMessage ? 'KUBUI NO HAMAJAK GO 💑' : 
           buttonState.showThirdMessage ? 'KUBUI NO HAMJAK NA BELE💖' : 
           buttonState.showAfterYesMessage ? 'ANO HAMJAKGO DA 💕' : 
           'WOULD YOU BE MY VALENTINE?'}
        </p>
        {(buttonState.showSixthMessage || buttonState.showSeventhMessage) && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
            <input
              type="text"
              value={buttonState.userInput}
              onChange={(e) => setButtonState(prev => ({ ...prev, userInput: e.target.value }))}
              placeholder="Type your response..."
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #10b981',
                fontSize: '16px',
                width: '300px',
                textAlign: 'center',
                marginBottom: '16px'
              }}
            />
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
          <button 
            onClick={handleYesClick}
            style={{ backgroundColor: '#10b981', color: 'white', fontWeight: 'bold', padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }} 
            className="hover:bg-green-600 transition-colors duration-200"
          >
            Yes
          </button>
          <button 
            id="no-button"
            onClick={handleNoClick}
            style={{ backgroundColor: '#ef4444', color: 'white', fontWeight: 'bold', padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} 
            className="hover:bg-red-600 transition-colors duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
