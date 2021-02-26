import { defineComponent } from 'vue';
import Logo from '../../assets/logo.png';
import HelloWord from '../../components/HelloWorld';

export default defineComponent({
  name: 'About',
  setup() {
    return () => (
      <>
        <h1>About</h1>
        <img src={Logo}/>
        <HelloWord msg={'Dynamic '}/>
      </>
    );
  }
});