/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Thêm CSS cho phần "Xem thêm"
const viewMoreStyle = {
  cursor: 'pointer',
  color: 'blue',
  textDecoration: 'underline',
};

export default function Description({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Nếu không có nội dung hoặc nội dung không dài, hiển thị bình thường
  if (!text || text.length <= 100) {
    return <div>{text}</div>;
  }

  // Nếu nội dung dài, kiểm tra xem có cần hiển thị thêm hay không
  if (!isExpanded) {
    return (
      <div>
        {text.slice(0, 100)}
        <span style={viewMoreStyle} onClick={handleToggleExpansion}>
          {' '}
          Xem thêm
        </span>
      </div>
    );
  }

  // Nếu đã được mở rộng, hiển thị toàn bộ nội dung và có nút "Thu gọn"
  return (
    <div>
      {text}
      <span style={viewMoreStyle} onClick={handleToggleExpansion}>
        {' '}
        Thu gọn
      </span>
    </div>
  );
}

Description.propTypes = {
  text: PropTypes.string.isRequired,
};
