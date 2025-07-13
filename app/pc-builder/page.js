'use client';

import { useState } from 'react';
import { Plus, Minus, Trash2, Cpu, HardDrive, MonitorSpeaker, Zap, Fan, MemoryStick, Clapperboard as Motherboard, ShoppingCart, AlertTriangle, CheckCircle, Info, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PCBuilderPage() {
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    cooling: null,
    case: null
  });

  const [activeCategory, setActiveCategory] = useState('cpu');
  const [showCompatibilityCheck, setShowCompatibilityCheck] = useState(false);

  const componentCategories = [
    { id: 'cpu', name: 'Processor', icon: Cpu, required: true },
    { id: 'motherboard', name: 'Motherboard', icon: Motherboard, required: true },
    { id: 'ram', name: 'Memory (RAM)', icon: MemoryStick, required: true },
    { id: 'gpu', name: 'Graphics Card', icon: MonitorSpeaker, required: true },
    { id: 'storage', name: 'Storage', icon: HardDrive, required: true },
    { id: 'psu', name: 'Power Supply', icon: Zap, required: true },
    { id: 'cooling', name: 'Cooling', icon: Fan, required: false },
    { id: 'case', name: 'PC Case', icon: Motherboard, required: false }
  ];

  const components = {
    cpu: [
      {
        id: 'cpu1',
        name: 'Intel Core i9-13900K',
        price: 589,
        image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['24 Cores (8P+16E)', '32 Threads', '5.8 GHz Boost', 'LGA1700 Socket'],
        powerDraw: 125,
        socket: 'LGA1700',
        rating: 4.8,
        reviews: 234,
        compatibility: ['motherboard1', 'motherboard2']
      },
      {
        id: 'cpu2',
        name: 'AMD Ryzen 9 7950X',
        price: 699,
        image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['16 Cores', '32 Threads', '5.7 GHz Boost', 'AM5 Socket'],
        powerDraw: 170,
        socket: 'AM5',
        rating: 4.9,
        reviews: 189,
        compatibility: ['motherboard3', 'motherboard4']
      },
      {
        id: 'cpu3',
        name: 'Intel Core i7-13700K',
        price: 409,
        image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['16 Cores (8P+8E)', '24 Threads', '5.4 GHz Boost', 'LGA1700 Socket'],
        powerDraw: 125,
        socket: 'LGA1700',
        rating: 4.7,
        reviews: 156,
        compatibility: ['motherboard1', 'motherboard2']
      }
    ],
    motherboard: [
      {
        id: 'motherboard1',
        name: 'ASUS ROG Z790 Hero',
        price: 629,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['LGA1700 Socket', 'DDR5 Support', 'PCIe 5.0', 'WiFi 6E'],
        socket: 'LGA1700',
        ramType: 'DDR5',
        maxRam: 128,
        rating: 4.8,
        reviews: 89,
        compatibility: ['cpu1', 'cpu3']
      },
      {
        id: 'motherboard2',
        name: 'MSI Z790 Gaming Pro',
        price: 299,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['LGA1700 Socket', 'DDR5 Support', 'PCIe 4.0', 'WiFi 6'],
        socket: 'LGA1700',
        ramType: 'DDR5',
        maxRam: 64,
        rating: 4.6,
        reviews: 134,
        compatibility: ['cpu1', 'cpu3']
      },
      {
        id: 'motherboard3',
        name: 'ASUS X670E Creator',
        price: 699,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['AM5 Socket', 'DDR5 Support', 'PCIe 5.0', 'WiFi 6E'],
        socket: 'AM5',
        ramType: 'DDR5',
        maxRam: 128,
        rating: 4.9,
        reviews: 67,
        compatibility: ['cpu2']
      }
    ],
    ram: [
      {
        id: 'ram1',
        name: 'Corsair Dominator 32GB DDR5-5600',
        price: 299,
        image: 'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['32GB (2x16GB)', 'DDR5-5600', 'RGB Lighting', 'Low Latency'],
        capacity: 32,
        type: 'DDR5',
        speed: 5600,
        rating: 4.8,
        reviews: 156,
        compatibility: ['motherboard1', 'motherboard2', 'motherboard3']
      },
      {
        id: 'ram2',
        name: 'G.Skill Trident Z5 64GB DDR5-6000',
        price: 599,
        image: 'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['64GB (2x32GB)', 'DDR5-6000', 'RGB Lighting', 'High Performance'],
        capacity: 64,
        type: 'DDR5',
        speed: 6000,
        rating: 4.9,
        reviews: 89,
        compatibility: ['motherboard1', 'motherboard3']
      }
    ],
    gpu: [
      {
        id: 'gpu1',
        name: 'NVIDIA RTX 4090',
        price: 1599,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['24GB GDDR6X', '16384 CUDA Cores', '2.5 GHz Boost', '450W TDP'],
        powerDraw: 450,
        length: 336,
        rating: 4.9,
        reviews: 234,
        compatibility: []
      },
      {
        id: 'gpu2',
        name: 'NVIDIA RTX 4080',
        price: 1199,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['16GB GDDR6X', '9728 CUDA Cores', '2.5 GHz Boost', '320W TDP'],
        powerDraw: 320,
        length: 310,
        rating: 4.8,
        reviews: 189,
        compatibility: []
      },
      {
        id: 'gpu3',
        name: 'AMD RX 7900 XTX',
        price: 999,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['24GB GDDR6', '6144 Stream Processors', '2.5 GHz Boost', '355W TDP'],
        powerDraw: 355,
        length: 320,
        rating: 4.7,
        reviews: 156,
        compatibility: []
      }
    ],
    storage: [
      {
        id: 'storage1',
        name: 'Samsung 980 PRO 2TB',
        price: 199,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['2TB NVMe SSD', '7000 MB/s Read', '6900 MB/s Write', 'PCIe 4.0'],
        capacity: 2000,
        type: 'NVMe SSD',
        rating: 4.8,
        reviews: 345,
        compatibility: []
      },
      {
        id: 'storage2',
        name: 'WD Black SN850X 1TB',
        price: 129,
        image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['1TB NVMe SSD', '7300 MB/s Read', '6600 MB/s Write', 'PCIe 4.0'],
        capacity: 1000,
        type: 'NVMe SSD',
        rating: 4.7,
        reviews: 234,
        compatibility: []
      }
    ],
    psu: [
      {
        id: 'psu1',
        name: 'Corsair RM1000x 1000W',
        price: 199,
        image: 'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['1000W 80+ Gold', 'Fully Modular', '10 Year Warranty', 'Zero RPM Mode'],
        wattage: 1000,
        efficiency: '80+ Gold',
        rating: 4.9,
        reviews: 189,
        compatibility: []
      },
      {
        id: 'psu2',
        name: 'EVGA SuperNOVA 850W',
        price: 149,
        image: 'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['850W 80+ Gold', 'Fully Modular', '10 Year Warranty', 'Eco Mode'],
        wattage: 850,
        efficiency: '80+ Gold',
        rating: 4.8,
        reviews: 267,
        compatibility: []
      }
    ],
    cooling: [
      {
        id: 'cooling1',
        name: 'Corsair H150i Elite Capellix',
        price: 189,
        image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['360mm AIO', 'RGB Lighting', 'ML120 RGB Fans', 'Zero RPM Mode'],
        type: 'AIO Liquid',
        size: 360,
        rating: 4.8,
        reviews: 156,
        compatibility: []
      },
      {
        id: 'cooling2',
        name: 'Noctua NH-D15',
        price: 99,
        image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['Dual Tower Air Cooler', 'Premium Fans', '6 Year Warranty', 'Silent Operation'],
        type: 'Air Cooler',
        height: 165,
        rating: 4.9,
        reviews: 234,
        compatibility: []
      }
    ],
    case: [
      {
        id: 'case1',
        name: 'Corsair 4000D Airflow',
        price: 109,
        image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['Mid Tower', 'Tempered Glass', 'Excellent Airflow', 'Cable Management'],
        formFactor: 'Mid Tower',
        maxGpuLength: 360,
        rating: 4.8,
        reviews: 345,
        compatibility: []
      },
      {
        id: 'case2',
        name: 'Fractal Design Define 7',
        price: 169,
        image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        specs: ['Full Tower', 'Sound Dampening', 'Modular Design', 'Premium Build'],
        formFactor: 'Full Tower',
        maxGpuLength: 440,
        rating: 4.9,
        reviews: 189,
        compatibility: []
      }
    ]
  };

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
    if (selectedComponents.cpu) total += selectedComponents.cpu.powerDraw || 0;
    if (selectedComponents.gpu) total += selectedComponents.gpu.powerDraw || 0;
    total += 100; // Base system power draw
    return total;
  };

  const getCompatibilityIssues = () => {
    const issues = [];
    
    // CPU and Motherboard socket compatibility
    if (selectedComponents.cpu && selectedComponents.motherboard) {
      if (selectedComponents.cpu.socket !== selectedComponents.motherboard.socket) {
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
    
    if (category === 'motherboard' && selectedComponents.cpu) {
      const compatibleMBs = components.motherboard.filter(mb => 
        mb.socket === selectedComponents.cpu.socket
      );
      recommendations.push(...compatibleMBs.slice(0, 2));
    }
    
    if (category === 'ram' && selectedComponents.motherboard) {
      const compatibleRAM = components.ram.filter(ram => 
        ram.type === selectedComponents.motherboard.ramType
      );
      recommendations.push(...compatibleRAM.slice(0, 2));
    }
    
    if (category === 'psu' && (selectedComponents.cpu || selectedComponents.gpu)) {
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
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${isSelected ? 'ring-2' : ''}`}
      style={{ ringColor: isSelected ? '#669999' : 'transparent' }}
    >
      <div className="relative">
        <img
          src={component.image}
          alt={component.name}
          className="w-full h-32 object-cover"
        />
        {isSelected && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="h-6 w-6 text-white" style={{ backgroundColor: '#669999', borderRadius: '50%' }} />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2" style={{ color: '#2e2e2e' }}>
          {component.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(component.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({component.reviews})
          </span>
        </div>

        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          {component.specs.slice(0, 3).map((spec, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1 h-1 rounded-full mr-2" style={{ backgroundColor: '#669999' }}></div>
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold" style={{ color: '#2e2e2e' }}>
            ${component.price}
          </span>
        </div>

        <button
          onClick={() => selectComponent(category, component)}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
            isSelected ? 'bg-gray-100 text-gray-600' : 'text-white'
          }`}
          style={{ backgroundColor: isSelected ? '#f3f4f6' : '#669999' }}
          onMouseEnter={(e) => !isSelected && (e.target.style.backgroundColor = '#5a8585')}
          onMouseLeave={(e) => !isSelected && (e.target.style.backgroundColor = '#669999')}
        >
          {isSelected ? 'Selected' : 'Select Component'}
        </button>
      </div>
    </div>
  );

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
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                
                <button 
                  className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  style={{ backgroundColor: '#669999' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5a8585'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#669999'}
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
            {selectedComponents.cpu || selectedComponents.motherboard ? (
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