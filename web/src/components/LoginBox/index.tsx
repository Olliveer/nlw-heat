import { VscGithubInverted } from 'react-icons/vsc';
import { useAuth } from '../../hooks/useAuth';
import ReactLoading from 'react-loading';
import styles from './styles.module.scss';

export function LoginBox() {
  const { user, signInUrl, signOut } = useAuth();

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>
        {!user ? 'Envie e compartilhe sua mensagem.' : `Olá! ${user?.name}`}
      </strong>

      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
}
