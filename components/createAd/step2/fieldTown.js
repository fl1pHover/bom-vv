import Input from '@/lib/Input';
import FormLabel from '../formLabel';

const FieldTown = ({
  selectedLocalData,
  handleNamedata = () => {},
  setPositions = () => {},
}) => {
  return (
    <InputContainer>
      <FormLabel title="Хотхон" />
      <Input
        ph="Хотхон"
        value={selectedLocalData?.town}
        onChange={(val) => {
          setPositions((prev) => ({
            ...prev,
            town_id: val.target.value,
          }));
          handleNamedata('town', val.target.value);
        }}
      />
    </InputContainer>
  );
};

export default FieldTown;

const InputContainer = (props) => (
  <div className="flex flex-col items-center w-full md:w-1/2">
    {props.children}
  </div>
);
