// ProductTableRow.js
import React from "react";
import { Tr, Td, IconButton, Collapse, Image, Box, Text } from "@chakra-ui/react";
import { AttachmentIcon, DeleteIcon, TriangleDownIcon, TriangleUpIcon, EditIcon } from "@chakra-ui/icons";
import { getNamePdf, formatPrice } from "./Utils";

function ProductTableRow({ product, handleEditClick, handleRemoveClick, expandedProduct, setExpandedProduct }) {
  return (
    <>
      <Tr>
        <Td>{product.name}</Td>
        <Td>R$ {formatPrice(product.price)}</Td>
        <Td>
          <Image src={product.image_url} alt={product.name} boxSize="50px" />
        </Td>
        <Td>
          {product.pdf_url && (
            <IconButton
              icon={<AttachmentIcon />}
              onClick={() => {
                const href = product.pdf_url;
                window.open(href, "_blank", "noopener noreferrer");
              }}
              aria-label={`Download ${product.name}`}
            />
          )}
        </Td>
        <Td>
          <IconButton
            icon={<EditIcon />}
            onClick={() => handleEditClick(product._id)}
            aria-label={`Edit ${product.name}`}
            colorScheme="green"
          />
        </Td>
        <Td>
          <IconButton
            icon={expandedProduct === product._id ? <TriangleUpIcon /> : <TriangleDownIcon />}
            onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
            aria-label={`Expandir ${product.name}`}
          />
        </Td>
        <Td>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleRemoveClick(product._id)}
            aria-label={`Remover ${product.name}`}
            colorScheme="red"
          />
        </Td>
      </Tr>
      <Tr>
        <Td colSpan={5} border="none">
          <Collapse in={expandedProduct === product._id}>
            <Box p={4} bg="transparent" borderRadius="none" border="none">
              <Text fontSize="lg" fontWeight="light">
                <strong>Descrição do Produto:</strong> {product.description}
              </Text>
              <Text mt={4} fontSize="lg" fontWeight="light">
                <strong>Tags:</strong> {product.tags.join(", ")}
              </Text>
              <Text mt={4} fontSize="lg" fontWeight="light">
                <strong>Anexo:</strong> {getNamePdf(product.pdf_url)}
              </Text>
            </Box>
          </Collapse>
        </Td>
      </Tr>
    </>
  );
}

export default ProductTableRow;
