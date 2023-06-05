import { Box, Text, Wrap, WrapItem, Tag, Avatar } from "@chakra-ui/react";
import Evento from "../../types/Evento";
import { FunctionComponent, PropsWithChildren } from "react";
import { format } from "date-fns";
import Beneficiado from "../../types/Beneficiado";

interface Cats {
  categorias: string;
}

interface BeneficiadoWCats extends Beneficiado, Cats {}

interface CivilItemProps {
  beneficiado: Beneficiado;
  onClick: (id: number) => void;
}

const CivilItem: FunctionComponent<PropsWithChildren<CivilItemProps>> = (
  props
) => {
  const beneficiado = props.beneficiado as unknown as BeneficiadoWCats;

  return (
    <Box
      key={beneficiado.id_beneficiado}
      w="100%"
      h="100%"
      borderColor="orange.300"
      borderWidth={1}
      borderStyle="solid"
      borderRadius={8}
      backgroundColor="white"
      p={4}
      onClick={() => props.onClick(beneficiado.id_beneficiado)}
    >
      <Box display="flex" alignItems="center">
        <Avatar src={beneficiado.imagen} name={beneficiado.nombre} />
        <Text fontWeight="bold" fontSize={18} ml={4} lineHeight={1}>
          {beneficiado.nombre}
        </Text>
      </Box>
      <Text mb={2}>{beneficiado.descripcion.substring(0, 40)}...</Text>
      <Text fontSize="sm">Correo electronico</Text>
      <Text>{beneficiado.email}</Text>
      <Wrap mt={2}>
        {beneficiado.categorias.split(",").map((cat) => (
          <WrapItem key={cat}>
            <Tag>{cat}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default CivilItem;
