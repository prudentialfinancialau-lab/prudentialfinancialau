import { useTina } from "tinacms/dist/react";
import Contact from '../components/Contact';

export default function ContactPage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page;

  return (
    <>
      <Contact data={content.contact} />
    </>
  );
}
