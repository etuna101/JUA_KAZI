import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

interface SearchBarProps {
  onSearch: (searchTerm: string, filters: SearchFilters) => void;
  placeholder?: string;
}

interface SearchFilters {
  category: string;
  location: string;
  priceRange: string;
}

const categories = [
  'All Categories',
  'Cleaning',
  'Plumbing',
  'Electrical',
  'Gardening',
  'Moving',
  'Painting',
];

const locations = [
  'All Locations',
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
];

const priceRanges = [
  'Any Price',
  'Under KSh 1,000',
  'KSh 1,000 - KSh 2,500',
  'KSh 2,500 - KSh 5,000',
  'Over KSh 5,000',
];

const formatKsh = (amount: number) => `KSh ${amount.toLocaleString()}`;

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for services...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'All Categories',
    location: 'All Locations',
    priceRange: 'Any Price',
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (
    type: keyof SearchFilters,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(searchTerm, filters);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          boxShadow: 3,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton onClick={handleFilterClick}>
          <FilterIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Active Filters */}
      {(filters.category !== 'All Categories' ||
        filters.location !== 'All Locations' ||
        filters.priceRange !== 'Any Price') && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filters.category !== 'All Categories' && (
            <Chip
              icon={<CategoryIcon />}
              label={filters.category}
              onDelete={() => handleFilterChange('category', 'All Categories')}
            />
          )}
          {filters.location !== 'All Locations' && (
            <Chip
              icon={<LocationIcon />}
              label={filters.location}
              onDelete={() => handleFilterChange('location', 'All Locations')}
            />
          )}
          {filters.priceRange !== 'Any Price' && (
            <Chip
              label={filters.priceRange}
              onDelete={() => handleFilterChange('priceRange', 'Any Price')}
            />
          )}
        </Box>
      )}

      {/* Filters Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: 300, maxHeight: 400, overflow: 'auto' }}>
          <List>
            <ListItem>
              <Typography variant="subtitle1" color="primary" sx={{ width: '100%', textAlign: 'center', mb: 1 }}>
                Category
              </Typography>
            </ListItem>
            {categories.map((category) => (
              <ListItem
                key={category}
                button
                selected={filters.category === category}
                onClick={() => handleFilterChange('category', category)}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <Typography variant="subtitle1" color="primary">
                Location
              </Typography>
            </ListItem>
            {locations.map((location) => (
              <ListItem
                key={location}
                button
                selected={filters.location === location}
                onClick={() => handleFilterChange('location', location)}
              >
                <ListItemText primary={location} />
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <Typography variant="subtitle1" color="primary">
                Price Range
              </Typography>
            </ListItem>
            {priceRanges.map((range) => (
              <ListItem
                key={range}
                button
                selected={filters.priceRange === range}
                onClick={() => handleFilterChange('priceRange', range)}
              >
                <ListItemText primary={range} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default SearchBar; 