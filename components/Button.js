import React from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';

const CustomButton = ({ variant, text, link }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return (
    <Button style={{backgroundColor:'#0c236e'}} variant={variant} onClick={handleClick}>
      {text}
    </Button>
  );
};

export default CustomButton;
