import { useTina } from "tinacms/dist/react";
import About from '../components/About';
import Help from '../components/Help';

export default function AboutPage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page;

  return (
    <>
      <About data={content.about} />
      <Help data={content.help} />
    </>
  );
}
