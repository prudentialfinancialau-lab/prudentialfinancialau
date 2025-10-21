import { useTina } from "tinacms/dist/react";
import Lenders from '../components/Lenders';
import MortgageCalculator from '../components/MortgageCalculator';

export default function LendersPage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page;

  return (
    <>
      <Lenders data={content.lenders} />
      <MortgageCalculator data={content.calculator} />
    </>
  );
}
