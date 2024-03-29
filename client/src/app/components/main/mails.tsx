import { useState } from 'react'

import Create from './components/create'
import GetEmail from './components/getEmail'
import Mail from './components/mail'

import { MailsTypeProps } from '../../types/message.props'
import { IMessage } from '../../interface/Email'

const Mails = ({ messagesObtained, messagesSent, isEmailReceived, isNewEmail, isEmailsSent, isGetEmail, setIsEmailReceived, setIsNewEmail, setIsEmailsSent, setIsGetEmail }: MailsTypeProps) => {

  const [idEmail, setIdEmail] = useState<string>("")

  return (
    <div className='container-mails'>
      {
        <>
          {
            isEmailReceived &&
            messagesObtained.map((email: IMessage) => {
              return <Mail email={email} isEmailReceived={isEmailReceived} isEmailsSent={isEmailsSent}
                setIsGetEmail={setIsGetEmail} setIsNewEmail={setIsNewEmail} setIsEmailReceived={setIsEmailReceived} setIsEmailsSent={setIsEmailsSent} setIdEmail={setIdEmail} key={email._id} />
            })
          }
        </>
      }
      {
        <>
          {
            isEmailsSent &&
            messagesSent.map((email: IMessage) => {
              return <Mail email={email} isEmailReceived={isEmailReceived} isEmailsSent={isEmailsSent}
                setIsGetEmail={setIsGetEmail} setIsNewEmail={setIsNewEmail} setIsEmailReceived={setIsEmailReceived} setIsEmailsSent={setIsEmailsSent} setIdEmail={setIdEmail} key={email._id} />
            })
          }
        </>
      }
      {
        isGetEmail && <GetEmail idEmail={idEmail} setIsGetEmail={setIsGetEmail} setIsEmailsSent={setIsEmailsSent} />
      }
      {
        isNewEmail && <Create setIsNewEmail={setIsNewEmail} setIsEmailsSent={setIsEmailsSent} />
      }
    </div >
  )
}

export default Mails