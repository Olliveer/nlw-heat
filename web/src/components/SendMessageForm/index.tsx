import { FormEvent, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import ReactLoading from 'react-loading';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export function SendMessageForm() {
  const [isLoding, setIsLoading] = useState(false);
  const { user, signOut } = useAuth();
  const [message, setMessage] = useState('');

  async function handleSendMessage(event: FormEvent) {
    setIsLoading(true);
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post('/messages', {
      message,
    });

    setMessage('');
    setIsLoading(false);
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted size={16} /> {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Menssagem</label>

        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">
          {isLoding ? (
            <ReactLoading type="bubbles" color="#fff" />
          ) : (
            'Enviar menssagem'
          )}
        </button>
      </form>
    </div>
  );
}
