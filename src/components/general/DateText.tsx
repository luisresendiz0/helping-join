import { Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  date: string | Date;
}

const DateText = (props: Props) => {
  return (
    <Text>
      {format(new Date(props.date), "dd LLLL yyyy hh:mm aaa", {
        locale: es,
      })}
    </Text>
  );
};

export default DateText;
