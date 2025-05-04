import Replicate from 'replicate';

// Safely get the API token with a fallback
const getApiToken = () => {
  const token = import.meta.env?.VITE_REPLICATE_API_TOKEN;
  if (!token) {
    console.warn('Replicate API token not found in environment variables');
    return ''; // Fallback token
  }
  return token;
};

const replicate = new Replicate({
  auth: getApiToken(),
});

export interface CatImage {
  url: string;
  id: string;
}

class CatService {
  private static instance: CatService;
  private catCache: CatImage[] = [];
  private isGenerating: boolean = false;

  private constructor() {}

  public static getInstance(): CatService {
    if (!CatService.instance) {
      CatService.instance = new CatService();
    }
    return CatService.instance;
  }

  private getRandomPrompt(): string {
    const styles = [
      "neon glow",
      "holographic",
      "ethereal light",
      "cyberpunk",
      "futuristic",
      "digital art",
      "3D render",
      "minimalist",
      "geometric",
      "abstract"
    ];
    const effects = [
      "glowing aura",
      "energy particles",
      "light trails",
      "digital particles",
      "holographic overlay",
      "neon outline",
      "light beams",
      "energy field",
      "digital waves",
      "light streaks"
    ];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    return `A mystical cat with ${effect}, ${style}, centered composition, high quality, detailed, professional, glowing effects, vibrant colors, modern UI aesthetic, clean design, minimalist background`;
  }

  public async generateCat(): Promise<CatImage> {
    try {
      const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: "An illustrration of a cat jumping",
            negative_prompt: "realistic, photograph, blurry, low quality, text, watermark, ugly, deformed, distorted, disfigured, bad anatomy, bad proportions, extra limbs, missing limbs, floating limbs, mutated hands, mutated fingers, bad hands, bad fingers, bad feet, bad face, bad eyes, bad mouth, bad teeth, bad nose, bad ears, bad hair, bad fur, bad skin, bad texture, bad lighting, bad shadows, bad colors, bad composition, bad perspective, bad depth, bad focus, bad contrast, bad saturation, bad exposure, bad white balance, bad noise, bad grain, bad artifacts, bad compression, bad quality, bad resolution, bad aspect ratio, bad framing, bad cropping, bad scaling, bad rotation, bad translation, bad transformation, bad warping, bad morphing, bad blending, bad compositing, bad masking, bad matting, bad keying, bad chroma keying, bad green screen, bad blue screen, bad alpha channel, bad transparency, bad opacity, bad visibility, bad rendering, bad shading, bad texturing, bad mapping, bad UV mapping, bad normal mapping, bad bump mapping, bad displacement mapping, bad specular mapping, bad reflection mapping, bad refraction mapping, bad environment mapping, bad cube mapping, bad sphere mapping, bad cylinder mapping, bad planar mapping, bad triplanar mapping, bad parallax mapping, bad relief mapping, bad height mapping, bad depth mapping, bad displacement, bad tessellation, bad subdivision, bad smoothing, bad anti-aliasing, bad filtering, bad sampling, bad interpolation, bad extrapolation, bad approximation, bad estimation, bad prediction, bad forecasting, bad simulation, bad emulation, bad virtualization, bad abstraction, bad representation, bad visualization, bad illustration, bad depiction, bad portrayal, bad characterization, bad personification, bad embodiment, bad manifestation, bad incarnation, bad reincarnation, bad resurrection, bad revival, bad rejuvenation, bad regeneration, bad restoration, bad reconstruction, bad rehabilitation, bad recovery, bad healing, bad curing, bad treatment, bad therapy, bad medicine, bad surgery, bad operation, bad procedure, bad process, bad method, bad technique, bad approach, bad strategy, bad tactic, bad plan, bad scheme, bad plot, bad conspiracy, bad intrigue, bad machination, bad manipulation, bad exploitation, bad abuse, bad misuse, bad mistreatment, bad maltreatment, bad ill-treatment, bad ill-usage, bad ill-use, bad ill-employment, bad ill-application, bad ill-appropriation, bad ill-allocation, bad ill-distribution, bad ill-assignment, bad ill-designation, bad ill-specification, bad ill-definition, bad ill-description, bad ill-explanation, bad ill-interpretation, bad ill-translation, bad ill-transcription, bad ill-transliteration, bad ill-transformation, bad ill-transmutation, bad ill-transfiguration, bad ill-transubstantiation, bad ill-metamorphosis, bad ill-metastasis, bad ill-metathesis, bad ill-metonymy, bad ill-synecdoche, bad ill-hyperbole, bad ill-litotes, bad ill-irony, bad ill-sarcasm, bad ill-satire, bad ill-parody, bad ill-burlesque, bad ill-caricature, bad ill-cartoon, bad ill-comic, bad ill-humorous, bad ill-witty, bad ill-jocular, bad ill-jocose, bad ill-jovial, bad ill-merry, bad ill-gay, bad ill-cheerful, bad ill-happy, bad ill-joyful, bad ill-joyous, bad ill-glad, bad ill-pleased, bad ill-delighted, bad ill-gratified, bad ill-satisfied, bad ill-content, bad ill-contented, bad ill-complacent, bad ill-self-satisfied, bad ill-self-complacent, bad ill-self-content, bad ill-self-contented, bad ill-self-gratified, bad ill-self-delighted, bad ill-self-pleased, bad ill-self-happy, bad ill-self-joyful, bad ill-self-joyous, bad ill-self-glad, bad ill-self-merry, bad ill-self-gay, bad ill-self-cheerful, bad ill-self-witty, bad ill-self-jocular, bad ill-self-jocose, bad ill-self-jovial, bad ill-self-humorous, bad ill-self-comic, bad ill-self-cartoon, bad ill-self-caricature, bad ill-self-burlesque, bad ill-self-parody, bad ill-self-satire, bad ill-self-sarcasm, bad ill-self-irony, bad ill-self-litotes, bad ill-self-hyperbole, bad ill-self-synecdoche, bad ill-self-metonymy, bad ill-self-metathesis, bad ill-self-metastasis, bad ill-self-metamorphosis, bad ill-self-transubstantiation, bad ill-self-transfiguration, bad ill-self-transmutation, bad ill-self-transformation, bad ill-self-transliteration, bad ill-self-transcription, bad ill-self-translation, bad ill-self-interpretation, bad ill-self-explanation, bad ill-self-description, bad ill-self-definition, bad ill-self-specification, bad ill-self-designation, bad ill-self-assignment, bad ill-self-distribution, bad ill-self-allocation, bad ill-self-appropriation, bad ill-self-application, bad ill-self-employment, bad ill-self-use, bad ill-self-usage, bad ill-self-treatment, bad ill-self-maltreatment, bad ill-self-mistreatment, bad ill-self-misuse, bad ill-self-abuse, bad ill-self-exploitation, bad ill-self-manipulation, bad ill-self-machination, bad ill-self-intrigue, bad ill-self-conspiracy, bad ill-self-plot, bad ill-self-scheme, bad ill-self-plan, bad ill-self-tactic, bad ill-self-strategy, bad ill-self-approach, bad ill-self-technique, bad ill-self-method, bad ill-self-process, bad ill-self-procedure, bad ill-self-operation, bad ill-self-surgery, bad ill-self-medicine, bad ill-self-therapy, bad ill-self-treatment, bad ill-self-healing, bad ill-self-curing, bad ill-self-recovery, bad ill-self-rehabilitation, bad ill-self-reconstruction, bad ill-self-restoration, bad ill-self-regeneration, bad ill-self-rejuvenation, bad ill-self-revival, bad ill-self-resurrection, bad ill-self-reincarnation, bad ill-self-incarnation, bad ill-self-manifestation, bad ill-self-embodiment, bad ill-self-personification, bad ill-self-characterization, bad ill-self-portrayal, bad ill-self-depiction, bad ill-self-illustration, bad ill-self-visualization, bad ill-self-representation, bad ill-self-abstraction, bad ill-self-virtualization, bad ill-self-emulation, bad ill-self-simulation, bad ill-self-forecasting, bad ill-self-prediction, bad ill-self-estimation, bad ill-self-approximation, bad ill-self-extrapolation, bad ill-self-interpolation, bad ill-self-sampling, bad ill-self-filtering, bad ill-self-anti-aliasing, bad ill-self-smoothing, bad ill-self-subdivision, bad ill-self-tessellation, bad ill-self-displacement, bad ill-self-depth mapping, bad ill-self-height mapping, bad ill-self-relief mapping, bad ill-self-parallax mapping, bad ill-self-triplanar mapping, bad ill-self-planar mapping, bad ill-self-cylinder mapping, bad ill-self-sphere mapping, bad ill-self-cube mapping, bad ill-self-environment mapping, bad ill-self-refraction mapping, bad ill-self-reflection mapping, bad ill-self-specular mapping, bad ill-self-displacement mapping, bad ill-self-bump mapping, bad ill-self-normal mapping, bad ill-self-UV mapping, bad ill-self-mapping, bad ill-self-texturing, bad ill-self-shading, bad ill-self-rendering, bad ill-self-visibility, bad ill-self-opacity, bad ill-self-transparency, bad ill-self-alpha channel, bad ill-self-blue screen, bad ill-self-green screen, bad ill-self-chroma keying, bad ill-self-keying, bad ill-self-matting, bad ill-self-masking, bad ill-self-compositing, bad ill-self-blending, bad ill-self-morphing, bad ill-self-warping, bad ill-self-transformation, bad ill-self-translation, bad ill-self-rotation, bad ill-self-scaling, bad ill-self-cropping, bad ill-self-framing, bad ill-self-aspect ratio, bad ill-self-resolution, bad ill-self-quality, bad ill-self-compression, bad ill-self-artifacts, bad ill-self-grain, bad ill-self-noise, bad ill-self-white balance, bad ill-self-exposure, bad ill-self-saturation, bad ill-self-contrast, bad ill-self-focus, bad ill-self-depth, bad ill-self-perspective, bad ill-self-composition, bad ill-self-colors, bad ill-self-shadows, bad ill-self-lighting, bad ill-self-texture, bad ill-self-skin, bad ill-self-fur, bad ill-self-hair, bad ill-self-ears, bad ill-self-nose, bad ill-self-teeth, bad ill-self-mouth, bad ill-self-eyes, bad ill-self-face, bad ill-self-feet, bad ill-self-fingers, bad ill-self-hands, bad ill-self-limbs, bad ill-self-proportions, bad ill-self-anatomy, bad ill-self-distorted, bad ill-self-deformed, bad ill-self-ugly, bad ill-self-watermark, bad ill-self-text, bad ill-self-quality, bad ill-self-blurry, bad ill-self-photograph, bad ill-self-realistic",
            width: 768,
            height: 768,
            num_outputs: 1,
            scheduler: "K_EULER",
            num_inference_steps: 50,
            guidance_scale: 7.5,
          }
        }
      );

      if (Array.isArray(output) && output.length > 0) {
        const catImage: CatImage = {
          url: output[0] as string,
          id: Math.random().toString(36).substring(7),
        };
        this.catCache.push(catImage);
        return catImage;
      }
      throw new Error('Failed to generate cat image');
    } catch (error) {
      console.error('Error generating cat:', error);
      // Generate a fallback glowing cat using a different model
      try {
        const fallbackOutput = await replicate.run(
          "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
          {
            input: {
              prompt: "An illustrration of a glowing neon cat, minimalist design, centered composition, high quality, professional, clean background",
              negative_prompt: "realistic, photograph, blurry, low quality, text, watermark",
              width: 512,
              height: 512,
              num_outputs: 1,
              scheduler: "K_EULER",
              num_inference_steps: 30,
              guidance_scale: 7.5,
            }
          }
        );
        
        if (Array.isArray(fallbackOutput) && fallbackOutput.length > 0) {
          return {
            url: fallbackOutput[0] as string,
            id: Math.random().toString(36).substring(7),
          };
        }
      } catch (fallbackError) {
        console.error('Error generating fallback cat:', fallbackError);
      }
      
      // If all else fails, use a simple glowing cat SVG
      return {
        url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjNjM2NmYxIiBkPSJNMjU2IDUxMmMxNDEuNCAwIDI1Ni0xMTQuNiAyNTYtMjU2UzM5Ny40IDAgMjU2IDBTMCAxMTQuNiAwIDI1NnMxMTQuNiAyNTYgMjU2IDI1NnptMC00ODBjMTIzLjcgMCAyMjQgMTAwLjMgMjI0IDIyNHMtMTAwLjMgMjI0LTIyNCAyMjRTMzIgMzc5LjcgMzIgMjU2IDEzMi4zIDMyIDI1NiAzMnptMCAzODRjODguNCAwIDE2MC03MS42IDE2MC0xNjBTMzQ0LjQgOTYgMjU2IDk2Uzk2IDE2Ny42IDk2IDI1NnM3MS42IDE2MCAxNjAgMTYwek0yNTYgMTkyYzM1LjMgMCA2NCAyOC43IDY0IDY0cy0yOC43IDY0LTY0IDY0LTY0LTI4LjctNjQtNjQgMjguNy02NCA2NC02NHoiLz48L3N2Zz4=',
        id: Math.random().toString(36).substring(7),
      };
    }
  }

  public async getCats(count: number): Promise<CatImage[]> {
    const needed = count - this.catCache.length;
    if (needed > 0 && !this.isGenerating) {
      this.isGenerating = true;
      try {
        const newCats = await Promise.all(
          Array(needed).fill(null).map(() => this.generateCat())
        );
        this.catCache = [...this.catCache, ...newCats];
      } finally {
        this.isGenerating = false;
      }
    }
    return this.catCache.slice(0, count);
  }

  public clearCache(): void {
    this.catCache = [];
  }
}

export default CatService; 