import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, Text, Divider, Circle
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type DeleteProjectModalProps = {
  isOpen: boolean;
  projectName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteProjectModal({
  isOpen,
  projectName,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay bg="#181818E5" backdropFilter="blur(6px)" />
      <ModalContent
        pt="10"
        pb="6"
        px={{ base: 5, md: 8 }}
        borderRadius="14px"
        boxShadow="2xl"
        position="relative"
      >
        <Circle
          size="64px"
          bg="#695CCD"
          color="white"
          position="absolute"
          top="-32px"
          left="50%"
          transform="translateX(-50%)"
          boxShadow="md"
        >
          <DeleteIcon boxSize={6} />
        </Circle>

        <ModalHeader
          textAlign="center"
          fontSize="24px"
          fontWeight="700"
          color="#1F1283"
          p="0"
          mb="4"
        >
          Remover projeto
        </ModalHeader>

        <Divider borderColor="rgba(0,0,0,0.12)" mb="6" />

        <ModalBody p="0" textAlign="center" mb="8">
          <Text color="#717171" mb="3">
            Essa ação removerá definitivamente o projeto:
          </Text>
          <Text fontSize="24px" fontWeight="500" color="#2A2360">
            {projectName}
          </Text>
        </ModalBody>

        <ModalFooter
          p="0"
          gap="4"
          justifyContent="center"
          flexDir={{ base: "column", sm: "row" }}
        >
          <Button
            onClick={onClose}
            variant="outline"
            borderColor="#6E63CD"
            color="#6E63CD"
            _hover={{ bg: "rgba(110,99,205,0.06)" }}
            borderRadius="26px"
            h="48px"
            px="8"
            w={{ base: "100%" }}
          >
            Cancelar
          </Button>

          <Button
            onClick={onConfirm}
            bg="#6E63CD"
            color="white"
            _hover={{ bg: "#5e54c8" }}
            borderRadius="26px"
            h="48px"
            px="8"
            w={{ base: "100%" }}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
