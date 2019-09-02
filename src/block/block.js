/**
 * BLOCK: card
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 
const { RichText, PlainText, MediaUpload, MediaUploadCheck, InspectorControls } = wp.editor;
const { Button } = wp.components;

registerBlockType( 'cgb/block-card', {
	title: __( 'Card Block' ),
	icon: 'heart',
	category: 'common',
	keywords: [
		__( 'card' ),
		__( 'riseapps' ),
	],
	attributes: {
		title: {
		  source: 'text',
		  selector: '.card__title'
		},
		body: {
		  type: 'array',
		  source: 'children',
		  selector: '.card__body'
    },
    imageAlt: {
      attribute: 'alt',
      selector: '.card__image'
    },
		imageUrl: {
		  attribute: 'src',
		  selector: '.card__image'
    },
    backgroundImage: {
      type: 'string',
      default: null, // no image by default!
    }
	},

  edit({ attributes, setAttributes }) {

    const getImageButton = (openEvent) => {
      if(attributes.imageUrl) {
        return (
          <img 
            src={ attributes.imageUrl }
            onClick={ openEvent }
            className="image"
          />
        );
      }
      else {
        return (
          <div className="button-container">
            <Button 
              onClick={ openEvent }
              className="button button-large"
            >Choose an Image
            </Button>
          </div>
        );
      }
    };
		return (
      <section>
        <div class="container">
          <div class="holder-posts">
            <div class="post">
              <div class="post-title">
                <div class="title-h3">
                  <i class="icon-element"></i>
                  <h3>
                    <PlainText
                      onChange={ content => setAttributes({ title: content }) }
                      value={ attributes.title }
                      placeholder="Your card title"
                      className="heading"
                    />
                  </h3>
                </div>
                <div class="img-log">
                  <img src="/wp-content/plugins/card/src/block/images/small-logo/the_green_planet.png" alt="image description" />
                </div>
              </div>
              <div class="post-content">
                <div class="post-txt">
                  <div class="txt">
                    <RichText
                      onChange={ content => setAttributes({ body: content }) }
                      value={ attributes.body }
                      placeholder="Your card text"
                      isSelected={ attributes.isSelected }
                    />
                  </div>
                  <ul class="small-images">
                    <li>
                      <img src="/wp-content/plugins/card/src/block/images/small-logo/kids_awards_winner.png" alt="image description" />
                    </li>
                    <li>
                      <img src="/wp-content/plugins/card/src/block/images/small-logo/kids_awards_winner.png" alt="image description" />
                    </li>
                    <li>
                      <img src="/wp-content/plugins/card/src/block/images/small-logo/kids_awards_winner.png" alt="image description" />
                    </li>
                  </ul>
                  <div class="card-post">
                    <div class="tupe-card">
                      <span class="card">Weekday party</span>
                      <span class="card">Gold</span>
                      <span class="card">Platinum</span>
                    </div>
                    <div class="line-card">
                      <span class="package">Package starts from <mark>AED 75</mark></span>
                      <a class="btn-border gray" href="#">Check availability <i class="icon-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="post-img">
                  <MediaUploadCheck>
                  <MediaUpload
                      value={ attributes.imageID }
                      render={ ({ open }) => getImageButton(open) }
                    />                    
                  </MediaUploadCheck>
                  <InspectorControls>
                    <MediaUpload
                      onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
                      type="image"
                      render={ ({ open }) => getImageButton(open) }
                    />
                    </InspectorControls>
                  <div class="br-el"></div>
                </div>
              </div>
              <div class="text-post-info">
                <div class="block-info">
                  <span>Venue type</span>
                  <ul class="list">
                    <li>Indoor entertainment</li>
                    <li>Suitable for ages 1-4</li>
                    <li>Theme park</li>
                  </ul>
                </div>
                <div class="block-info">
                  <span>Features</span>
                  <ul class="list">
                    <li>Party themes</li>
                    <li>Characters</li>
                    <li>More feature</li>
                    <li>More feature</li>
                  </ul>
                </div>
                <div class="block-info">
                  <span>Working hours</span>
                  <ul class="list">
                    <li>Sat-Wed: 9am - 8pm</li>
                    <li>Thu: 9am - 10pm</li>
                    <li>TFri: 10am - 10pm</li>
                  </ul>
                </div>
                <div class="block-info">
                  <span>Location</span>
                  <ul class="list">
                    <li>ICity Walk, Dubai</li>
                    <li>Get direction</li>
                  </ul>
                </div>
              </div>
              <div class="link-post">
                <a class="btn-border white" href="#">Explore venue <i class="icon-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
		);
	},

	save({ attributes }) {
    const cardImage = (src, alt) => {
      if(!src) return null;
  
      if(alt) {
        return (
          <img 
            className="card__image" 
            src={ src }
            alt={ alt }
          /> 
        );
      }
      
      return (
        <img 
          className="card__image" 
          src={ src }
          alt=""
          aria-hidden="true"
        /> 
      );
    };
		return (
		<section className="">
        <div class="container">
          <div class="holder-posts">
            <div class="post">
              <div class="post-title">
                <div class="title-h3">
                  <i class="icon-element"></i>
				  	      <h3 className="card__title">{ attributes.title }</h3>
                </div>
                <div class="img-log">
                  <img src="/wp-content/plugins/card/src/block/images/small-logo/the_green_planet.png" alt="123image description" />
                </div>
              </div>
              <div class="post-content">
                <div class="post-txt">
                  <div class="txt">
				  	        <p className="card__body">{ attributes.body }</p>
                  </div>
                  <ul class="small-images">
                    <li>
                      <img src="/wp-content/plugins/card/src/block/images/small-logo/kids_awards_winner.png" alt="image description" />
                    </li>
                    <li>
                      <img src="/wp-content/plugins/card/src/block/images/small-logo/kids_awards_winner.png" alt="image description" />
                    </li>
                    <li>
                      <img src="/wp-content/plugins/card/src/block/images/small-logo/kids_awards_winner.png" alt="image description" />
                    </li>
                  </ul>
                  <div class="card-post">
                    <div class="tupe-card">
                      <span class="card">Weekday party</span>
                      <span class="card">Gold</span>
                      <span class="card">Platinum</span>
                    </div>
                    <div class="line-card">
                      <span class="package">Package starts from <mark>AED 75</mark></span>
                      <a class="btn-border gray" href="#">Check availability <i class="icon-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="post-img">
                  { cardImage(attributes.imageUrl, attributes.imageAlt) }
                  <div class="br-el"></div>
                </div>
              </div>
              <div class="text-post-info">
                <div class="block-info">
                  <span>Venue type</span>
                  <ul class="list">
                    <li>Indoor entertainment</li>
                    <li>Suitable for ages 1-4</li>
                    <li>Theme park</li>
                  </ul>
                </div>
                <div class="block-info">
                  <span>Features</span>
                  <ul class="list">
                    <li>Party themes</li>
                    <li>Characters</li>
                    <li>More feature</li>
                    <li>More feature</li>
                  </ul>
                </div>
                <div class="block-info">
                  <span>Working hours</span>
                  <ul class="list">
                    <li>Sat-Wed: 9am - 8pm</li>
                    <li>Thu: 9am - 10pm</li>
                    <li>TFri: 10am - 10pm</li>
                  </ul>
                </div>
                <div class="block-info">
                  <span>Location</span>
                  <ul class="list">
                    <li>ICity Walk, Dubai</li>
                    <li>Get direction</li>
                  </ul>
                </div>
              </div>
              <div class="link-post">
                <a class="btn-border white" href="#">Explore venue <i class="icon-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
		);
	},
} );
