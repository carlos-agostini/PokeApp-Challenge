import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

function Filter({ onFilterChange, onSortChange, onTypeChange, selectedTypes }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Input 
        placeholder="Filter Pokémon by name" 
        onChange={(e) => onFilterChange(e.target.value)}
        style={{ width: '40%' }}
      />
      <Select
        defaultValue="id" // Set default value to "id"
        placeholder="Sort by"
        onChange={onSortChange}
        style={{ width: '20%' }}
      >
        <Option value="id">ID</Option>
        <Option value="name">Name (A-Z)</Option>
        <Option value="-name">Name (Z-A)</Option>
      </Select>
      <Select
        mode="multiple" // Allow multiple selections
        placeholder="Select types"
        onChange={onTypeChange}
        style={{ width: '40%' }}
        value={selectedTypes}
      >
        {/* Add options for different types */}
        <Option value="normal">Normal</Option>
        <Option value="fighting">Fighting</Option>
        <Option value="flying">Flying</Option>
        <Option value="poison">Poison</Option>
        {/* Add more type options here */}
      </Select>
    </div>
  );
}

export default Filter;
