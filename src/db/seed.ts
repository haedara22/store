import { db, categories, products, productImages, storeSettings, adminUsers } from './index';
import { generateId } from '@/lib/utils';
import { hashPassword } from '@/lib/auth';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Create admin user
    console.log('👤 Creating admin user...');
    const hasAdmins = await db.query.adminUsers.findFirst();
    
    if (!hasAdmins) {
      const passwordHash = await hashPassword('admin123');
      await db.insert(adminUsers).values({
        id: generateId('admin'),
        username: 'admin',
        passwordHash,
      });
      console.log('✅ Admin user created (username: admin, password: admin123)');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create store settings
    console.log('⚙️  Creating store settings...');
    const hasSettings = await db.query.storeSettings.findFirst();
    
    if (!hasSettings) {
      await db.insert(storeSettings).values({
        id: generateId('settings'),
        storeName: 'متجر الحامد',
        phone: '0900000000',
        whatsapp: '963900000000',
        address: 'دمشق، سوريا',
        workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
        shamcashAccountName: 'متجر الحامد',
        shamcashAccountNumber: '09XXXXXXXX',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
      });
      console.log('✅ Store settings created');
    } else {
      console.log('ℹ️  Store settings already exist');
    }

    // Create categories
    console.log('🏷️  Creating categories...');
    const existingCategories = await db.query.categories.findMany();
    
    if (existingCategories.length === 0) {
      const categoriesData = [
        {
          id: generateId('cat'),
          name: 'إلكترونيات',
          slug: 'electronics',
          description: 'أحدث الأجهزة الإلكترونية والتقنية',
        },
        {
          id: generateId('cat'),
          name: 'أزياء',
          slug: 'fashion',
          description: 'ملابس وإكسسوارات عصرية',
        },
        {
          id: generateId('cat'),
          name: 'منزل ومطبخ',
          slug: 'home-kitchen',
          description: 'أدوات منزلية ومستلزمات المطبخ',
        },
        {
          id: generateId('cat'),
          name: 'رياضة وصحة',
          slug: 'sports-health',
          description: 'معدات رياضية ومنتجات صحية',
        },
        {
          id: generateId('cat'),
          name: 'كتب وقرطاسية',
          slug: 'books-stationery',
          description: 'كتب وأدوات مكتبية',
        },
      ];

      await db.insert(categories).values(categoriesData);
      console.log(`✅ Created ${categoriesData.length} categories`);

      // Create sample products
      console.log('📦 Creating sample products...');
      const category = categoriesData[0];
      
      const productsData = [
        {
          id: generateId('prod'),
          name: 'سماعات لاسلكية',
          slug: 'wireless-headphones',
          description: 'سماعات بلوتوث عالية الجودة مع إلغاء الضوضاء',
          price: 150000,
          compareAtPrice: 200000,
          categoryId: category.id,
          stock: 50,
          featured: true,
          specifications: {
            'اللون': 'أسود',
            'نوع الاتصال': 'بلوتوث 5.0',
            'عمر البطارية': '24 ساعة',
            'الضمان': 'سنة واحدة',
          } as Record<string, string>,
        },
        {
          id: generateId('prod'),
          name: 'ساعة ذكية',
          slug: 'smart-watch',
          description: 'ساعة ذكية بشاشة AMOLED وميزات صحية',
          price: 250000,
          categoryId: category.id,
          stock: 30,
          featured: true,
          specifications: {
            'حجم الشاشة': '1.4 بوصة',
            'مقاومة الماء': 'IP68',
            'عمر البطارية': '7 أيام',
            'الضمان': 'سنة واحدة',
          } as Record<string, string>,
        },
        {
          id: generateId('prod'),
          name: 'شاحن سريع',
          slug: 'fast-charger',
          description: 'شاحن سريع 65 واط مع منافذ متعددة',
          price: 75000,
          compareAtPrice: 100000,
          categoryId: category.id,
          stock: 100,
          specifications: {
            'القدرة': '65 واط',
            'عدد المنافذ': '3',
            'الحماية': 'ضد الحرارة والجهد الزائد',
            'الضمان': '6 أشهر',
          } as Record<string, string>,
        },
      ];

      for (const product of productsData) {
        await db.insert(products).values(product);
      }

      console.log(`✅ Created ${productsData.length} sample products`);
    } else {
      console.log(`ℹ️  Categories already exist (${existingCategories.length} found)`);
    }

    console.log('✅ Database seeding completed!');
    console.log('\n📝 Default credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n🔗 Login URL: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('\n✨ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seed failed:', error);
    process.exit(1);
  });
