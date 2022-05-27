import React, { useState } from "react"
import { styles } from "../ChatStyle"
import { LoadingOutlined } from '@ant-design/icons'
import Avatar from '../Avatar'
import Chat from "./Chat.js";

const EmailForm = props => {    
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [showChat,showSetChat]=useState(false)
    const [showForm,showSetForm]=useState(true)
   
    const startChat=()=>{
        // setLoading(true)
        // setTimeout(() => {
        //     setLoading(false)
            
        // }, 10000);
        console.log("hey chat")
        showSetForm(false)
        // showSetChat(true)
        
    }

    return (
        <>{showForm?
       <div 
            style={{
                ...styles.emailFormWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    opacity: props.visible ? '1' : '0'
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)', 
                        left: 'calc(50% - 41px)',  
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar 
                    style={{ 
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Welcome to my <br /> support 👋
                </div>

                <form 
                    onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        placeholder='Your Email'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                </form>
                
                <div style={styles.bottomText}>
                    {/* Enter your email <br /> to get started. */}
                    <button style={styles.submitBtn} onClick={startChat}>Get Started</button>
                </div>
            </div>
        </div>
        :<Chat user={email}/>}
            
        </>
    )
}

export default EmailForm;