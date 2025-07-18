'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, Cpu, HardDrive, MonitorSpeaker, Zap, Fan, MemoryStick, Clapperboard as Motherboard, ShoppingCart, AlertTriangle, CheckCircle, Info, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { gettheparts } from '@/lib/api';
import { addToCart } from '@/lib/storage';

export default function PCBuilderPage() {
  const [selectedComponents, setSelectedComponents] = useState({
    CPU: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    cooling: null,
    case: null
  });

  const [activeCategory, setActiveCategory] = useState('CPU');
  const [showCompatibilityCheck, setShowCompatibilityCheck] = useState(false);
  const [components, setComponents] = useState({
    CPU: [],
    motherboard: [],
    ram: [],
    gpu: [],
    storage: [],
    psu: [],
    cooling: [],
    case: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const componentCategories = [
    { id: 'CPU', name: 'Processor', icon: Cpu, required: true },
    { id: 'motherboard', name: 'Motherboard', icon: Motherboard, required: true },
    { id: 'ram', name: 'Memory (RAM)', icon: MemoryStick, required: true },
    { id: 'gpu', name: 'Graphics Card', icon: MonitorSpeaker, required: true },
    { id: 'storage', name: 'Storage', icon: HardDrive, required: true },
    { id: 'psu', name: 'Power Supply', icon: Zap, required: true },
    { id: 'cooling', name: 'Cooling', icon: Fan, required: false },
    { id: 'case', name: 'PC Case', icon: Motherboard, required: false }
  ];

  // Add a new useEffect to fetch parts for the active category only
  useEffect(() => {
    let isMounted = true;
    async function fetchCategoryParts() {
      setLoading(true);
      setError('');
      try {
        const data = await gettheparts(activeCategory);
        if (isMounted) {
          setComponents(prev => ({
            ...prev,
            [activeCategory]: data.data || []
          }));
        }
      } catch (err) {
        if (isMounted) setError('Failed to load parts for ' + activeCategory);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchCategoryParts();
    return () => { isMounted = false; };
  }, [activeCategory]);

  const selectComponent = (category, component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
  };

  const removeComponent = (category) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: null
    }));
  };

  const getTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, component) => {
      return total + (component ? component.price : 0);
    }, 0);
  };

  const getTotalPowerDraw = () => {
    let total = 0;
    if (selectedComponents.CPU) total += selectedComponents.CPU.powerDraw || 0;
    if (selectedComponents.gpu) total += selectedComponents.gpu.powerDraw || 0;
    total += 100; // Base system power draw
    return total;
  };

  const getCompatibilityIssues = () => {
    const issues = [];
    
    // CPU and Motherboard socket compatibility
    if (selectedComponents.CPU && selectedComponents.motherboard) {
      if (selectedComponents.CPU.socket !== selectedComponents.motherboard.socket) {
        issues.push('CPU and Motherboard sockets are incompatible');
      }
    }

    // RAM and Motherboard compatibility
    if (selectedComponents.ram && selectedComponents.motherboard) {
      if (selectedComponents.ram.type !== selectedComponents.motherboard.ramType) {
        issues.push('RAM type is incompatible with Motherboard');
      }
    }

    // Power Supply wattage check
    if (selectedComponents.psu) {
      const totalPower = getTotalPowerDraw();
      const psuWattage = selectedComponents.psu.wattage;
      if (totalPower > psuWattage * 0.8) { // 80% rule
        issues.push(`Power Supply may be insufficient. Recommended: ${Math.ceil(totalPower / 0.8)}W`);
      }
    }

    // GPU and Case clearance
    if (selectedComponents.gpu && selectedComponents.case) {
      if (selectedComponents.gpu.length > selectedComponents.case.maxGpuLength) {
        issues.push('Graphics Card may not fit in selected Case');
      }
    }

    return issues;
  };

  const getRecommendations = (category) => {
    const recommendations = [];
    
    if (category === 'motherboard' && selectedComponents.CPU) {
      const compatibleMBs = components.motherboard.filter(mb => 
        mb.socket === selectedComponents.CPU.socket
      );
      recommendations.push(...compatibleMBs.slice(0, 2));
    }
    
    if (category === 'ram' && selectedComponents.motherboard) {
      const compatibleRAM = components.ram.filter(ram => 
        ram.type === selectedComponents.motherboard.ramType
      );
      recommendations.push(...compatibleRAM.slice(0, 2));
    }
    
    if (category === 'psu' && (selectedComponents.CPU || selectedComponents.gpu)) {
      const totalPower = getTotalPowerDraw();
      const recommendedWattage = Math.ceil(totalPower / 0.8);
      const suitablePSUs = components.psu.filter(psu => 
        psu.wattage >= recommendedWattage
      );
      recommendations.push(...suitablePSUs.slice(0, 2));
    }

    if (recommendations.length === 0) {
      recommendations.push(...components[category].slice(0, 2));
    }

    return recommendations;
  };

  const ComponentCard = ({ component, category, isSelected = false }) => (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col items-center justify-between cursor-pointer border-2 border-transparent hover:border-[#669999]"
      style={{ minHeight: '320px', maxWidth: '340px', margin: '0 auto', padding: '32px 0' }}
      onClick={() => selectComponent(category, component)}
    >
      <div className="flex-1 flex items-center justify-center w-full" style={{ minHeight: '180px' }}>
        <img
          src={component.imagecover || component.image || '/placeholder-image.jpg'}
          alt={component.name}
          className="w-[90%] h-[180px] object-contain rounded-xl shadow-sm bg-gray-50"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-6">
        <h3 className="font-semibold text-xl mb-2 text-center" style={{ color: '#2e2e2e' }}>
          {component.title || component.name}
        </h3>
        <span className="text-2xl font-bold text-center" style={{ color: '#669999' }}>
          {component.price ? `${component.price}` : ''}DA
          </span>
      </div>
    </div>
  );

  // Add to Cart handler
  const handleAddToCart = () => {
    // Only add required components (not null)
    const requiredCategories = componentCategories.filter(c => c.required).map(c => c.id);
    const selectedRequired = requiredCategories.map(cat => selectedComponents[cat]).filter(Boolean);
    selectedRequired.forEach(part => addToCart(part));
    alert('All selected parts have been added to your cart!');
    // Clear all chosen parts
    setSelectedComponents({
      cpu: null,
      motherboard: null,
      ram: null,
      gpu: null,
      storage: null,
      psu: null,
      cooling: null,
      case: null
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center text-lg text-gray-600">Loading PC parts...</div>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center text-lg text-red-600">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
            PC Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your dream PC with our interactive component selector. 
            Get real-time compatibility checks and expert recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Selected Components Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
                Your Build
              </h2>

              {/* Component List */}
              <div className="space-y-4 mb-6">
                {componentCategories.map((category) => {
                  const IconComponent = category.icon;
                  const selected = selectedComponents[category.id];
                  
                  return (
                    <div key={category.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-5 w-5" style={{ color: '#669999' }} />
                          <span className="font-medium text-sm" style={{ color: '#2e2e2e' }}>
                            {category.name}
                          </span>
                          {category.required && (
                            <span className="text-red-500 text-xs">*</span>
                          )}
                        </div>
                        {selected && (
                          <button
                            onClick={() => removeComponent(category.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      {selected ? (
                        <div className="ml-7">
                          <p className="text-sm font-medium" style={{ color: '#2e2e2e' }}>
                            {selected.name}
                          </p>
                          <p className="text-sm font-bold" style={{ color: '#669999' }}>
                            ${selected.price}
                          </p>
                        </div>
                      ) : (
                        <div className="ml-7">
                          <button
                            onClick={() => setActiveCategory(category.id)}
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            Choose {category.name}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Compatibility Check */}
              <div className="mb-6">
                <button
                  onClick={() => setShowCompatibilityCheck(!showCompatibilityCheck)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-gray-50"
                >
                  <span className="font-medium" style={{ color: '#2e2e2e' }}>
                    Compatibility Check
                  </span>
                  <div className="flex items-center space-x-2">
                    {getCompatibilityIssues().length === 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </button>
                
                {showCompatibilityCheck && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    {getCompatibilityIssues().length === 0 ? (
                      <p className="text-sm text-green-600">
                        ✓ All components are compatible
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {getCompatibilityIssues().map((issue, index) => (
                          <p key={index} className="text-sm text-red-600 flex items-start">
                            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            {issue}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Power Consumption */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: '#2e2e2e' }}>
                    Estimated Power Draw
                  </span>
                  <span className="text-sm font-bold" style={{ color: '#669999' }}>
                    {getTotalPowerDraw()}W
                  </span>
                </div>
                {selectedComponents.psu && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: '#669999',
                        width: `${Math.min((getTotalPowerDraw() / selectedComponents.psu.wattage) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold" style={{ color: '#2e2e2e' }}>
                    Total Price
                  </span>
                  <span className="text-2xl font-bold" style={{ color: '#669999' }}>
                    {getTotalPrice()}DA
                  </span>
                </div>
                
                <button 
                  className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  style={{ backgroundColor: '#669999' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5a8585'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#669999'}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Component Selection Area */}
          <div className="lg:col-span-3">
            {/* Category Tabs */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {componentCategories.map((category) => {
                  const IconComponent = category.icon;
                  const isActive = activeCategory === category.id;
                  const isSelected = selectedComponents[category.id] !== null;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      style={{ backgroundColor: isActive ? '#669999' : 'transparent' }}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{category.name}</span>
                      {isSelected && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommendations Section */}
            {selectedComponents.CPU || selectedComponents.motherboard ? (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Info className="h-5 w-5" style={{ color: '#669999' }} />
                  <h3 className="text-lg font-semibold" style={{ color: '#2e2e2e' }}>
                    Recommended for {componentCategories.find(c => c.id === activeCategory)?.name}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getRecommendations(activeCategory).map((component) => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      category={activeCategory}
                      isSelected={selectedComponents[activeCategory]?.id === component.id}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {/* All Components */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
                All {componentCategories.find(c => c.id === activeCategory)?.name} Options
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components[activeCategory]?.map((component) => (
                  <ComponentCard
                    key={component.id}
                    component={component}
                    category={activeCategory}
                    isSelected={selectedComponents[activeCategory]?.id === component.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}