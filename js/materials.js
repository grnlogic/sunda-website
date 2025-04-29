document.addEventListener('DOMContentLoaded', function() {
    // Material modal elements
    const materialModal = document.getElementById('material-modal');
    const materialTitle = document.getElementById('material-title');
    const materialContent = document.getElementById('material-content');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Profile modal elements
    const profileModal = document.getElementById('profile-modal');
    const profileBtn = document.getElementById('profile-btn');
    
    // Category card links
    const categoryLinks = document.querySelectorAll('.category-link');
    
    // Setup event listeners for category links
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const categoryType = this.closest('.category-card').getAttribute('data-category');
                loadMaterialDetail(categoryType);
            });
        });
    }
    
    // Profile button click handler
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (profileModal) {
                profileModal.classList.add('active');
            }
        });
    }
    
    // Close modal event for all modals
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (materialModal) materialModal.classList.remove('active');
                if (profileModal) profileModal.classList.remove('active');
            });
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === materialModal) materialModal.classList.remove('active');
        if (e.target === profileModal) profileModal.classList.remove('active');
    });
    
    // Function to load material detail
    function loadMaterialDetail(category) {
        if (!materialModal || !materialTitle || !materialContent) return;
        
        // Set the material title based on category
        const titles = {
            'ngabasa': 'Ngabasa: Kaidah Basa Sunda',
            'sastra': 'Sastra Sunda: Guguritan jeung Sajak',
            'budaya': 'Kabudayaan Sunda: Tradisi jeung Adat-istiadat'
        };
        
        materialTitle.textContent = titles[category] || 'Detail Materi';
        
        // Load material content based on category
        materialContent.innerHTML = getMaterialContent(category);
        
        // Show the modal
        materialModal.classList.add('active');
        
        // Initialize exercises if any
        initExercises();
    }
    
    // Function to get material content based on category
    function getMaterialContent(category) {
        let content = '';
        
        switch(category) {
            case 'ngabasa':
                content = `
                    <div class="material-header">
                        <h3 class="material-title">Tatakrama Basa Sunda</h3>
                        <div class="material-meta">
                            <span><i class="far fa-clock"></i> 25 menit</span>
                            <span><i class="fas fa-book-open"></i> Kelas X</span>
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Naon Tatakrama Basa Téh?</h3>
                        <p class="material-text">
                            Tatakrama basa mangrupa aturan pamakéan basa anu luyu jeung kaayaan nu keur gumelar. 
                            Tatakrama basa anu luyu jeung tuntunan adat Sunda ngawengku undak-usuk basa, 
                            bagian-bagian tina undak-usuk basa, jeung pabidaan-pabidaan pamakéan undak-usuk basa.
                        </p>
                        <p class="material-text">
                            Undak-usuk basa Sunda kapanggih dina kahirupan masarakat Sunda sarta jadi ciri has
                            lengkah-paripolah jeung pangjaga dina ngagunakeun basa Sunda. 
                            Undak-usuk basa Sunda téh dipakéna nilik kana:
                        </p>
                        <ul class="material-list">
                            <li>Sasaruaan umur</li>
                            <li>Sasaruaan kaayaan/kalungguhan/pangkat</li>
                            <li>Sasaruaan atawa ceuk darajat atikan</li>
                            <li>Situasi resmi atawa henteu</li>
                            <li>Saha nu keur nyarita</li>
                            <li>Saha nu keur disarita</li>
                        </ul>
                    </div>
                    
                    <div class="material-section">
                        <h3>Ragam Basa Sunda</h3>
                        <p class="material-text">
                            Dina kahirupan sapopoé, basa Sunda téh mibanda ragam basa anu bisa dibédakeun jadi 2 ragam nya éta:
                        </p>
                        
                        <div class="material-example">
                            <h4>Basa Lemes</h4>
                            <p>Basa lemes nyaéta ragam basa anu dipaké ku urang Sunda pikeun ngahargaan ka jalma anu diajak nyarita 
                            (ka II) atawa anu keur dicaritakeun (ka III).</p>
                            <p>Contoh:<br>
                            "<em>Dupi punten, bapa parantos tuang?</em>"<br>
                            (Maaf, apakah bapak sudah makan?)</p>
                        </div>
                        
                        <div class="material-example">
                            <h4>Basa Kasar</h4>
                            <p>Basa kasar nyaéta ragam basa anu dipaké ku urang Sunda pikeun ngahargaan kana dirina. 
                            Basa kasar ogé sok dipaké pikeun nyarita ka jalma anu geus loma pisan.</p>
                            <p>Contoh:<br>
                            "<em>Manéh geus dahar?</em>"<br>
                            (Kamu sudah makan?)</p>
                        </div>
                        
                        <div class="material-tip">
                            <h4><i class="fas fa-lightbulb"></i> Catetan Penting</h4>
                            <p>Patali jeung kecap-kecap undak usuk basa, bisa disebutkeun yén aya sababaraha kecap dina 
                            basa Sunda anu mibanda padanan kecap dina tingkat lemes, lemes pisan, jeung kasar.</p>
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Contoh Kecap dina Undak-usuk Basa</h3>
                        
                        <div class="table-responsive">
                            <table class="example-table">
                                <thead>
                                    <tr>
                                        <th>Basa Kasar</th>
                                        <th>Basa Lemes</th>
                                        <th>Basa Lemes Pisan</th>
                                        <th>Bahasa Indonesia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Dahar</td>
                                        <td>Neda</td>
                                        <td>Tuang</td>
                                        <td>Makan</td>
                                    </tr>
                                    <tr>
                                        <td>Balik</td>
                                        <td>Wangsul</td>
                                        <td>Mulih</td>
                                        <td>Pulang</td>
                                    </tr>
                                    <tr>
                                        <td>Baju</td>
                                        <td>Raksukan</td>
                                        <td>Anggoan</td>
                                        <td>Baju</td>
                                    </tr>
                                    <tr>
                                        <td>Imah</td>
                                        <td>Bumi</td>
                                        <td>Rorompok</td>
                                        <td>Rumah</td>
                                    </tr>
                                    <tr>
                                        <td>Hejo</td>
                                        <td>Héjo</td>
                                        <td>Héjo</td>
                                        <td>Hijau</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Conto Percakapan</h3>
                        
                        <div class="material-example">
                            <h4>Percakapan 1: Antara Guru jeung Murid</h4>
                            <p><strong>Guru:</strong> <em>"Kumaha, Yudi? Kamari teu sakola, naon margina?"</em><br>
                            (Bagaimana, Yudi? Kemarin tidak sekolah, apa alasannya?)</p>
                            <p><strong>Yudi:</strong> <em>"Hapunten, Bu. Abdi kamari teu sakola margi teu damang."</em><br>
                            (Maaf, Bu. Saya kemarin tidak sekolah karena sakit.)</p>
                            <p><strong>Guru:</strong> <em>"Oh kitu, ayeuna kumaha? Tos damang deui?"</em><br>
                            (Oh begitu, sekarang bagaimana? Sudah sembuh lagi?)</p>
                            <p><strong>Yudi:</strong> <em>"Alhamdulillah, Bu. Ayeuna mah tos damang deui."</em><br>
                            (Alhamdulillah, Bu. Sekarang sudah sembuh lagi.)</p>
                        </div>
                        
                        <div class="material-example">
                            <h4>Percakapan 2: Antara Babaturan</h4>
                            <p><strong>Asep:</strong> <em>"Hey, Ujang! Kamana wae manéh téh? Ti kamari teu katingal."</em><br>
                            (Hey, Ujang! Kemana saja kamu? Dari kemarin tidak kelihatan.)</p>
                            <p><strong>Ujang:</strong> <em>"Euy, kamari mah kuring gering, jadi teu bisa sakola."</em><br>
                            (Euy, kemarin saya sakit, jadi tidak bisa sekolah.)</p>
                            <p><strong>Asep:</strong> <em>"Oh gering naon manéh téh?"</em><br>
                            (Oh sakit apa kamu?)</p>
                            <p><strong>Ujang:</strong> <em>"Muriang wungkul, tapi ayeuna mah geus cageur deui."</em><br>
                            (Demam saja, tapi sekarang sudah sembuh lagi.)</p>
                        </div>
                    </div>
                    
                    <div class="material-exercise">
                        <h4><i class="fas fa-pencil-alt"></i> Latihan</h4>
                        <p>Pilih kecap anu leres dina basa lemes:</p>
                        
                        <div class="exercise-question">
                            <p>1. "Abdi _____ ka sakola unggal dinten."</p>
                            <div class="exercise-options">
                                <div class="exercise-option" data-correct="false">A. Leumpang</div>
                                <div class="exercise-option" data-correct="true">B. Angkat</div>
                                <div class="exercise-option" data-correct="false">C. Indit</div>
                                <div class="exercise-option" data-correct="false">D. Jalan</div>
                            </div>
                        </div>
                        
                        <div class="exercise-question">
                            <p>2. "Dupi Bapa _____ ti kantor?"</p>
                            <div class="exercise-options">
                                <div class="exercise-option" data-correct="false">A. Balik</div>
                                <div class="exercise-option" data-correct="false">B. Balik deui</div>
                                <div class="exercise-option" data-correct="true">C. Mulih</div>
                                <div class="exercise-option" data-correct="false">D. Pulang</div>
                            </div>
                        </div>
                        
                        <div class="exercise-feedback"></div>
                        <button class="btn primary-btn check-answers-btn">Pariksa Jawaban</button>
                    </div>
                    
                    <div class="material-nav">
                        <a href="#" class="btn secondary-btn"><i class="fas fa-arrow-left"></i> Materi Saméméhna</a>
                        <a href="#" class="btn primary-btn">Materi Salajengna <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                break;
                
            case 'sastra':
                content = `
                    <div class="material-header">
                        <h3 class="material-title">Guguritan jeung Sajak</h3>
                        <div class="material-meta">
                            <span><i class="far fa-clock"></i> 30 menit</span>
                            <span><i class="fas fa-book-open"></i> Kelas X</span>
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Naon Guguritan Téh?</h3>
                        <p class="material-text">
                            Guguritan nyaéta karangan ugeran anu diwangun ku sababaraha pada. 
                            Unggal pada diwangun ku sababaraha padalisan. 
                            Guguritan mah rékaan manusa, nya éta para pujangga. 
                            Ayana guguritan méh sarua jeung pupuh, lantaran guguritan ogé maké 
                            aturan kawih anu disebut pola guru lagu, guru wilangan jeung pedotan.
                        </p>
                        
                        <div class="material-tip">
                            <h4><i class="fas fa-lightbulb"></i> Catetan Penting</h4>
                            <p>Dina sasatra Sunda aya 17 pupuh, tapi nu mindeng dipaké aya 11 pupuh, nya éta:</p>
                            <ol>
                                <li>Asmarandana</li>
                                <li>Balakbak</li>
                                <li>Dangdanggula</li>
                                <li>Durma</li>
                                <li>Gambuh</li>
                                <li>Kinanti</li>
                                <li>Ladrang</li>
                                <li>Lambang</li>
                                <li>Magatru</li>
                                <li>Maskumambang</li>
                                <li>Mijil</li>
                            </ol>
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Conto Guguritan Kinanti</h3>
                        
                        <div class="material-image">
                            <img src="img/materials/kinanti-example.jpg" alt="Contoh Guguritan Kinanti">
                        </div>
                        
                        <div class="material-example">
                            <h4>Guguritan "Abdi Sukma" (Kinanti)</h4>
                            <p><em>
                                Abdi teh sukma nu leungit<br>
                                Leungit musna tanpa lebih<br>
                                Hirup ukur keur sorangan<br>
                                Taya tempat keur mumungkit<br>
                                Najan loba nu nyarita<br>
                                Sakabeh ngan keur ngabungbung
                            </em></p>
                            <p>Terjemahan:<br>
                                Aku adalah jiwa yang hilang<br>
                                Hilang tanpa sisa<br>
                                Hidup hanya untuk sendiri<br>
                                Tak ada tempat untuk berbagi<br>
                                Walau banyak yang bicara<br>
                                Semua hanya untuk menghibur
                            </p>
                        </div>
                        
                        <p class="material-text">
                            Dina guguritan Kinanti, aturanna nyaéta:
                        </p>
                        <ul class="material-list">
                            <li>Jumlah padalisan: 6</li>
                            <li>Guru wilangan: 8, 8, 8, 8, 8, 8</li>
                            <li>Guru lagu: u, i, a, i, a, i</li>
                            <li>Watek: Són-són / Prihatin</li>
                        </ul>
                    </div>
                    
                    <div class="material-section">
                        <h3>Naon Sajak Téh?</h3>
                        <p class="material-text">
                            Sajak mangrupa karya sastra anu ngagunakeun kecap-kecap anu kawengku ku wirahma,
                            ritma, jeung musikalitas anu miboga harti anu sagemblengna. 
                            Sajak béda jeung guguritan. Lamun guguritan mah dikauger ku patokan, 
                            tapi sajak mah bebas, nyaéta teu dikauger ku patokan.
                        </p>
                        
                        <div class="material-example">
                            <h4>Sajak "Tanah Sunda" (Ajip Rosidi)</h4>
                            <p><em>
                                Di dieu di bumi anu sakieu geulisna<br>
                                kami geus diparaban tina sarupaning kadaharan<br>
                                Sanajan daging joha atawa sangsrah buntut<br>
                                Dugi ka trugbag anu di iwat dina tongtolang<br>
                                Kami diaping diubar ku pangarti<br>
                                Kitu ceuk kolot anu baheula
                            </em></p>
                            <p>Terjemahan:<br>
                                Di sini di bumi yang begitu indahnya<br>
                                kami telah dibesarkan dari berbagai macam makanan<br>
                                Meskipun daging anjing atau panggang buntut<br>
                                Hingga trugbag yang dibakar di antara tulang<br>
                                Kami dirawat diobati dengan pengetahuan<br>
                                Begitu kata orang tua zaman dulu
                            </p>
                        </div>
                    </div>
                    
                    <div class="material-exercise">
                        <h4><i class="fas fa-pencil-alt"></i> Latihan</h4>
                        <p>Jawab pertanyaan di handap:</p>
                        
                        <div class="exercise-question">
                            <p>1. Naon waé aturan tina pupuh Kinanti?</p>
                            <div class="exercise-options">
                                <div class="exercise-option" data-correct="false">A. 7 padalisan, 8-8-8-8-8-8-8 guru wilangan, a-i-a-i-a-i-a guru lagu</div>
                                <div class="exercise-option" data-correct="true">B. 6 padalisan, 8-8-8-8-8-8 guru wilangan, u-i-a-i-a-i guru lagu</div>
                                <div class="exercise-option" data-correct="false">C. 5 padalisan, 7-7-7-7-7 guru wilangan, i-a-i-a-i guru lagu</div>
                                <div class="exercise-option" data-correct="false">D. 8 padalisan, 8-8-8-8-8-8-8-8 guru wilangan, a-i-a-i-a-i-a-i guru lagu</div>
                            </div>
                        </div>
                        
                        <div class="exercise-question">
                            <p>2. Naon bédana guguritan jeung sajak?</p>
                            <div class="exercise-options">
                                <div class="exercise-option" data-correct="false">A. Guguritan leuwih panjang tibatan sajak</div>
                                <div class="exercise-option" data-correct="false">B. Sajak mindeng dipaké jaman baheula, guguritan jaman ayeuna</div>
                                <div class="exercise-option" data-correct="true">C. Guguritan dikauger ku patokan, sajak mah bebas teu aya patok</div>
                                <div class="exercise-option" data-correct="false">D. Guguritan mangrupa prosa, sajak mangrupa puisi</div>
                            </div>
                        </div>
                        
                        <div class="exercise-feedback"></div>
                        <button class="btn primary-btn check-answers-btn">Pariksa Jawaban</button>
                    </div>
                    
                    <div class="material-nav">
                        <a href="#" class="btn secondary-btn"><i class="fas fa-arrow-left"></i> Materi Saméméhna</a>
                        <a href="#" class="btn primary-btn">Materi Salajengna <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                break;
                
            case 'budaya':
                content = `
                    <div class="material-header">
                        <h3 class="material-title">Tradisi jeung Adat-istiadat Sunda</h3>
                        <div class="material-meta">
                            <span><i class="far fa-clock"></i> 35 menit</span>
                            <span><i class="fas fa-book-open"></i> Kelas X</span>
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Budaya Sunda</h3>
                        <p class="material-text">
                            Budaya Sunda mangrupa salah sahiji budaya anu hirup, tumuwuh, sarta mekar di Indonesia. 
                            Masarakat Sunda mibanda adat-istiadat, kabiasaan, norma, jeung nilai-nilai anu diwariskeun 
                            turuntemurun ti karuhun (leluhur).
                        </p>
                        
                        <div class="material-image">
                            <img src="img/materials/seren-taun.jpg" alt="Upacara Seren Taun">
                        </div>
                        
                        <p class="material-text">
                            Urang Sunda miboga loba tradisi jeung adat-istiadat anu didadasaran ku ajén-inajén (nilai) 
                            spiritualitas ogé pamahaman ngeunaan alam jeung lingkungan sabudeureunana. 
                            Kiwari masih loba tradisi jeung adat-istiadat nu dilaksanakeun ku masarakat Sunda, 
                            di antarana:
                        </p>
                    </div>
                    
                    <div class="material-section">
                        <h3>Seren Taun</h3>
                        <p class="material-text">
                            Seren Taun mangrupa upacara adat Sunda anu dilaksanakeun pikeun sukuran kana hasil tatanén, 
                            utamana paré. Upacara ieu biasana dilakukeun di lingkungan masarakat Sunda, hususna di 
                            wewengkon Kuningan, Cipta Gelar (Sukabumi), Cigugur, Jampang, jeung sajabana. Ieu upacara 
                            dilaksanakeun sanggeus musim panen jeung ogé pikeun ngadoakeun tatanén nu bakal datang.
                        </p>
                        
                        <div class="material-tip">
                            <h4><i class="fas fa-lightbulb"></i> Catetan Penting</h4>
                            <p>Seren Taun asalna tina kecap 'seren' anu hartina 'Serah', jeung 'taun' anu hartina 'tahun'. 
                            Jadi, Seren Taun hartina mangrupa ritual serah terima antara tahun nu geus kaliwat jeung tahun nu baka datang, 
                            kalawan harepan pikeun mangsa tatanen nu leuwih alus.</p>
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Upacara Perkawinan Adat Sunda</h3>
                        <p class="material-text">
                            Upacara perkawinan adat Sunda mibanda sababaraha tahapan, di antarana:
                        </p>
                        
                        <div class="material-example">
                            <h4>1. Neundeun Omong</h4>
                            <p>Niat ti pihak lalaki pikeun ngalamar atawa neangan calon pamajikan. 
                            Ieu tahapan biasana dilakukeun ku kolot ti pihak lalaki ka kolot pihak awéwé.</p>
                        </div>
                        
                        <div class="material-example">
                            <h4>2. Narosan/Lamaran</h4>
                            <p>Lamaran resmi ti pihak lalaki ka pihak awéwé. Dina ieu tahapan, biasana dibawa rupa-rupa 
                            pangiring (oleh-oleh) kayaning roti, bubuahan, jeung sajabana.</p>
                        </div>
                        
                        <div class="material-example">
                            <h4>3. Seserahan</h4>
                            <p>Prosési masrahkeun barang-barang ti panganten lalaki ka panganten awéwé. 
                            Barang-barang nu biasa diserenkeun nyaéta pakéan, perhiasan, perabot rumah tangga, 
                            uang, jsb.</p>
                        </div>
                        
                        <div class="material-example">
                            <h4>4. Ngeuyeuk Seureuh</h4>
                            <p>Upacara pikeun méré naséhat ka calon panganten ngeunaan kahirupan rumah tangga. 
                            'Seureuh' nyaéta daun sirih, anu jadi perlambang hirup ripuh tur butuh gawé bareng 
                            dina rumah tangga.</p>
                        </div>
                        
                        <div class="material-example">
                            <h4>5. Ijab Kabul</h4>
                            <p>Akad nikah anu dilaksanakeun nurutkeun syariat Islam. Ieu mangrupa inti tina upacara perkawinan.</p>
                        </div>
                        
                        <div class="material-image">
                            <img src="img/materials/pernikahan-sunda.jpg" alt="Upacara Pernikahan Adat Sunda">
                        </div>
                    </div>
                    
                    <div class="material-section">
                        <h3>Pakakas Tradisional Sunda</h3>
                        <p class="material-text">
                            Masarakat Sunda ogé mibanda rupa-rupa pakakas tradisional anu dipaké dina kahirupan sapopoé, di antarana:
                        </p>
                        
                        <div class="table-responsive">
                            <table class="example-table">
                                <thead>
                                    <tr>
                                        <th>Ngaran</th>
                                        <th>Fungsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lisung</td>
                                        <td>Wadah pikeun nutu paré</td>
                                    </tr>
                                    <tr>
                                        <td>Halu</td>
                                        <td>Pakakas pikeun nutu paré di lisung</td>
                                    </tr>
                                    <tr>
                                        <td>Boboko</td>
                                        <td>Wadah sangeu/dahareun</td>
                                    </tr>
                                    <tr>
                                        <td>Nyiru</td>
                                        <td>Pakakas pikeun ngisikan béas</td>
                                    </tr>
                                    <tr>
                                        <td>Aseupan</td>
                                        <td>Pakakas pikeun ngaseup sangu</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="material-exercise">
                        <h4><i class="fas fa-pencil-alt"></i> Latihan</h4>
                        <p>Jawab pertanyaan di handap:</p>
                        
                        <div class="exercise-question">
                            <p>1. Naon anu dimaksud ku Seren Taun?</p>
                            <div class="exercise-options">
                                <div class="exercise-option" data-correct="true">A. Upacara sukuran kana hasil tatanén, utamana paré</div>
                                <div class="exercise-option" data-correct="false">B. Upacara pernikahan adat Sunda</div>
                                <div class="exercise-option" data-correct="false">C. Upacara sunatan budak lalaki</div>
                                <div class="exercise-option" data-correct="false">D. Upacara panyambutan tamu kehormatan</div>
                            </div>
                        </div>
                        
                        <div class="exercise-question">
                            <p>2. Tahapan upacara perkawinan nu mana anu mangrupa prosési masrahkeun barang-barang ti panganten lalaki ka panganten awéwé?</p>
                            <div class="exercise-options">
                                <div class="exercise-option" data-correct="false">A. Neundeun Omong</div>
                                <div class="exercise-option" data-correct="false">B. Narosan/Lamaran</div>
                                <div class="exercise-option" data-correct="true">C. Seserahan</div>
                                <div class="exercise-option" data-correct="false">D. Ngeuyeuk Seureuh</div>
                            </div>
                        </div>
                        
                        <div class="exercise-feedback"></div>
                        <button class="btn primary-btn check-answers-btn">Pariksa Jawaban</button>
                    </div>
                    
                    <div class="material-nav">
                        <a href="#" class="btn secondary-btn"><i class="fas fa-arrow-left"></i> Materi Saméméhna</a>
                        <a href="#" class="btn primary-btn">Materi Salajengna <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                break;
                
            default:
                content = '<p>Materi teu kapanggih.</p>';
        }
        
        return content;
    }
    
    // Function to initialize exercises in the material
    function initExercises() {
        const checkAnswersBtn = document.querySelector('.check-answers-btn');
        const exerciseOptions = document.querySelectorAll('.exercise-option');
        const exerciseFeedback = document.querySelector('.exercise-feedback');
        
        if (checkAnswersBtn && exerciseOptions.length > 0 && exerciseFeedback) {
            checkAnswersBtn.addEventListener('click', function() {
                let correctCount = 0;
                let totalQuestions = document.querySelectorAll('.exercise-question').length;
                
                // Check each option
                exerciseOptions.forEach(option => {
                    if (option.classList.contains('selected')) {
                        if (option.getAttribute('data-correct') === 'true') {
                            option.classList.add('correct');
                            correctCount++;
                        } else {
                            option.classList.add('wrong');
                        }
                    }
                    
                    // Highlight the correct answer
                    if (option.getAttribute('data-correct') === 'true') {
                        option.classList.add('correct');
                    }
                });
                
                // Update feedback
                let resultMessage = '';
                if (correctCount === totalQuestions) {
                    resultMessage = `<div class="success-feedback">Leres sadayana! Anjeun ngajawab ${correctCount} tina ${totalQuestions} soal kalawan leres.</div>`;
                } else {
                    resultMessage = `<div class="partial-feedback">Anjeun ngajawab ${correctCount} tina ${totalQuestions} soal kalawan leres. Mangga diulik deui!</div>`;
                }
                
                exerciseFeedback.innerHTML = resultMessage;
                
                // Disable check button
                this.disabled = true;
            });
            
            // Select option when clicked
            exerciseOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from siblings
                    const question = this.closest('.exercise-question');
                    const options = question.querySelectorAll('.exercise-option');
                    options.forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selected class to this option
                    this.classList.add('selected');
                });
            });
        }
    }
});
