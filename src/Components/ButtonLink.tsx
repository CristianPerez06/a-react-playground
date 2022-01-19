import React from 'react';
import cn from 'classnames';
import moduleStyles from './ButtonLink.module.css'

type StyledButtonProps = {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  customStyles?: any;
};

const StyledButton: React.FC<StyledButtonProps> = (props) => {
  // Props
  const {
    text,
    onClick,
    isDisabled = false,
    customStyles = {}
  } = props;

  // Methods
  const handleOnClick = async () => {
    onClick?.();
  }

  return (
    <button
      type='button'
      disabled={isDisabled}
      className={
        cn(moduleStyles.button,
          { [moduleStyles.buttonDisabled]: isDisabled },
          { [customStyles.button]: !!customStyles.button },
        )
      }
      onClick={handleOnClick}
    >
      {text}
    </button>
  )
};

const ButtonLink: React.FC = (props) => {
  // Methods
  const handleOnClick = async () => {
    alert('Button clicked');
  }

  return (
    <div className='h-50 w-50' style={{ backgroundColor: 'white', padding: 20 + 'px' }}>
      <StyledButton text={'Click me'} isDisabled={false} onClick={handleOnClick}/>
    </div>
  )
}

export default ButtonLink;

