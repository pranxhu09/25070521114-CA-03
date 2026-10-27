import React from 'react';
import Header from './homeComp/header';
import MainContent from './homeComp/mainContentCont';
import Footer from './homeComp/footer';
import './App.css';

const Home = ({
  gigs,
  loading,
  error,
  onUpdateStatus,
  onDeleteGig,
  onSelectGigForDrawer,
  searchTerm,
  setSearchTerm
}) => {
  const totalGigs = gigs.length;
  const openGigs = gigs.filter(g => (g.status || '').toLowerCase() === 'open').length;

  return (
    <div className="home-cont">
      <Header
        totalGigs={totalGigs}
        openGigs={openGigs}
        onSearchChange={setSearchTerm}
        searchTerm={searchTerm}
      />
      
      <MainContent
        gigs={gigs}
        loading={loading}
        error={error}
        onUpdateStatus={onUpdateStatus}
        onDeleteGig={onDeleteGig}
        onSelectGigForDrawer={onSelectGigForDrawer}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Footer />
    </div>
  );
};

export default Home;
